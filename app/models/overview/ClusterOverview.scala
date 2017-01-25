package models.overview

import play.api.libs.json._

class ClusterOverview(clusterState: JsValue, nodesStats: JsValue, indicesStats: JsValue,
                      clusterSettings: JsValue, aliases: JsValue, clusterHealth: JsValue,
                      nodes: JsValue, main: JsValue) {

  def json: JsValue = {
    val indices = Indices(clusterState, indicesStats, aliases)
    val clusterNodes = Nodes(clusterState, nodesStats, nodes)

    val persistentAllocation = (clusterSettings \ "persistent" \ "cluster" \ "routing" \ "allocation" \ "enable").asOpt[String].getOrElse("all")
    val transientAllocation = (clusterSettings \ "transient" \ "cluster" \ "routing" \ "allocation" \ "enable").asOpt[String]
    val shardAllocation = transientAllocation.getOrElse(persistentAllocation).equals("all")

    JsObject(Seq(
      // clusterHealth
      "cluster_name"          -> (clusterHealth \ "cluster_name").as[JsString],
      "status"                -> (clusterHealth \ "status").as[JsString],
      "number_of_nodes"       -> (clusterHealth \ "number_of_nodes").as[JsNumber],
      "active_primary_shards" -> (clusterHealth \ "active_primary_shards").as[JsNumber],
      "active_shards"         -> (clusterHealth \ "active_shards").as[JsNumber],
      "relocating_shards"     -> (clusterHealth \ "relocating_shards").as[JsNumber],
      "initializing_shards"   -> (clusterHealth \ "initializing_shards").as[JsNumber],
      "unassigned_shards"     -> (clusterHealth \ "unassigned_shards").as[JsNumber],
      // indicesStats
      "docs_count"            -> (indicesStats \ "_all" \ "primaries" \ "docs" \ "count").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "size_in_bytes"         -> (indicesStats \ "_all" \ "total" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "total_indices"         -> JsNumber(indices.size),
      "closed_indices"        -> JsNumber(indices.count { idx => (idx \ "closed").as[Boolean] } ),
      "special_indices"       -> JsNumber(indices.count { idx => (idx \ "special").as[Boolean] } ),
      "indices"               -> JsArray(indices),
      "nodes"                 -> JsArray(clusterNodes),
      "shard_allocation"      -> JsBoolean(shardAllocation)
    ))
  }
}

object Nodes {

  def apply(clusterState: JsValue, nodesStats: JsValue, nodes: JsValue): Seq[JsValue] = {
    val currentMaster = (clusterState \ "master_node").as[String]
    (nodes \ "nodes").as[JsObject].value.map { case (nodeId, info) =>

      val nodeRoles = NodeRoles(info)
      val stats = (nodesStats \ "nodes" \ nodeId).as[JsObject]
      val totalInBytes = (stats \ "fs" \ "total" \ "total_in_bytes").asOpt[Long].getOrElse(0l)
      val diskFreeInBytes = (stats \ "fs" \ "total" \ "free_in_bytes").asOpt[Long].getOrElse(0l)
      Json.obj(
        "id"             -> JsString(nodeId),
        "current_master" -> JsBoolean(nodeId.equals(currentMaster)),
        "name"           -> (info \ "name").as[JsString],
        "host"           -> (info \ "host").as[JsString],
        "ip"             -> (info \ "ip").as[JsString],
        "es_version"     -> (info \ "version").as[JsString],
        "jvm_version"    -> (info \ "jvm" \ "version").as[JsString],
        "load_average"         -> loadAverage(stats),
        "available_processors" -> (info \ "os" \ "available_processors").as[JsNumber],
        "cpu_percent"    -> cpuPercent(stats),
        "master"         -> JsBoolean(nodeRoles.master),
        "data"           -> JsBoolean(nodeRoles.data),
        "client"         -> JsBoolean(nodeRoles.client),
        "ingest"         -> JsBoolean(nodeRoles.ingest),
        "heap"           -> Json.obj(
          "used"          -> (stats \ "jvm" \ "mem" \ "heap_used_in_bytes").as[JsNumber],
          "committed"     -> (stats \ "jvm" \ "mem" \ "heap_committed_in_bytes").as[JsNumber],
          "used_percent"  -> (stats \ "jvm" \ "mem" \ "heap_used_percent").as[JsNumber],
          "max"           -> (stats \ "jvm" \ "mem" \ "heap_max_in_bytes").as[JsNumber]
        ),
        "disk"            -> Json.obj(
          "total_in_bytes"     -> JsNumber(totalInBytes),
          "disk_free_in_bytes" -> JsNumber(diskFreeInBytes),
          "used_percent"       -> JsNumber(100 - (100 * (diskFreeInBytes.toFloat / totalInBytes.toFloat)).toInt)
        )
      )
    }.toSeq
  }

  def loadAverage(nodeStats: JsValue): JsNumber = {
    val load = (nodeStats \ "os" \ "cpu" \ "load_average" \ "1m").asOpt[Float].getOrElse( // 5.X
      (nodeStats \ "os" \ "load_average").asOpt[Float].getOrElse(0f) // FIXME: 2.X
    )
    JsNumber(BigDecimal(load.toDouble))
  }

  def cpuPercent(nodeStats: JsValue): JsNumber = {
    val cpu = (nodeStats \ "os" \ "cpu" \ "percent").asOpt[Int].getOrElse( // 5.X
      (nodeStats \ "os" \ "cpu_percent").asOpt[Int].getOrElse(0) // FIXME 2.X
    )
    JsNumber(BigDecimal(cpu))
  }

}

object Indices {

  def apply(clusterState: JsValue, indicesStats: JsValue, aliases: JsValue) = {
    val routingTable = (clusterState \ "routing_table" \ "indices").as[JsObject]
    val openIndices = routingTable.value.map { case (index, shards) =>
      val stats = (indicesStats \ "indices" \ index).asOpt[JsObject].getOrElse(Json.obj())
      val indexShards = (shards \ "shards").as[JsObject].values.flatMap { case shards =>
        shards.as[JsArray].value.map { instance =>
          (instance \ "node").asOpt[String].getOrElse("unassigned") -> instance
        }
      }.groupBy(_._1).mapValues { shards => JsArray(shards.map(_._2).toSeq) }.toSeq

      val numShards = (shards \ "shards").as[JsObject].keys.size
      val numReplicas = (shards \ "shards" \ "0").as[JsArray].value.size - 1

      val unhealthy = indexShards.find(_._1.equals("unassigned")).isDefined
      val special = index.startsWith(".")

      JsObject(Seq(
        "name"                -> JsString(index),
        "closed"              -> JsBoolean(false),
        "special"             -> JsBoolean(special),
        "unhealthy"           -> JsBoolean(unhealthy),
        "doc_count"           -> (stats \ "primaries" \ "docs" \ "count").asOpt[JsNumber].getOrElse(JsNumber(0)),
        "deleted_docs"        -> (stats \ "primaries" \ "docs" \ "deleted").asOpt[JsNumber].getOrElse(JsNumber(0)),
        "size_in_bytes"       -> (stats \ "primaries" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
        "total_size_in_bytes" -> (stats \ "total" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
        "aliases"             -> JsArray((aliases \ index \ "aliases").asOpt[JsObject].getOrElse(Json.obj()).keys.map(JsString(_)).toSeq), // 1.4 < does not return aliases obj
        "num_shards"          -> JsNumber(numShards),
        "num_replicas"        -> JsNumber(numReplicas),
        "shards"              -> JsObject(indexShards)
      ))
    }.toSeq

    openIndices ++ ClosedIndices(clusterState)
  }

}

object ClosedIndices {

  def apply(clusterState: JsValue) = {
    val blocks = (clusterState \ "blocks" \ "indices").asOpt[JsObject].getOrElse(Json.obj())
    blocks.keys.collect {
      case index if (blocks \ index \ "4").asOpt[JsObject].isDefined =>
        Json.obj(
          "name" -> JsString(index),
          "closed" -> JsBoolean(true),
          "special" -> JsBoolean(index.startsWith("."))
        )
    }
  }
}
