package models.overview

import play.api.libs.json._

object ClusterOverview {

  def apply(clusterState: JsValue, nodesStats: JsValue, indicesStats: JsValue,
            clusterSettings: JsValue, aliases: JsValue, clusterHealth: JsValue,
            nodesInfo: JsValue): JsValue = {
    val indices = buildIndices(clusterState, indicesStats, aliases)

    val masterNodeId = (clusterState \ "master_node").as[String]

    val persistentAllocation = (clusterSettings \ "persistent" \ "cluster" \ "routing" \ "allocation" \ "enable").asOpt[String].getOrElse("all")
    val transientAllocation = (clusterSettings \ "transient" \ "cluster" \ "routing" \ "allocation" \ "enable").asOpt[String]
    val shardAllocation = transientAllocation.getOrElse(persistentAllocation).equals("all")

    JsObject(Seq(
      // clusterHealth
      "cluster_name" -> (clusterHealth \ "cluster_name").as[JsString],
      "status" -> (clusterHealth \ "status").as[JsString],
      "number_of_nodes" -> (clusterHealth \ "number_of_nodes").as[JsNumber],
      "active_primary_shards" -> (clusterHealth \ "active_primary_shards").as[JsNumber],
      "active_shards" -> (clusterHealth \ "active_shards").as[JsNumber],
      "relocating_shards" -> (clusterHealth \ "relocating_shards").as[JsNumber],
      "initializing_shards" -> (clusterHealth \ "initializing_shards").as[JsNumber],
      "unassigned_shards" -> (clusterHealth \ "unassigned_shards").as[JsNumber],
      // indicesStats
      "docs_count" -> (indicesStats \ "_all" \ "primaries" \ "docs" \ "count").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "size_in_bytes" -> (indicesStats \ "_all" \ "total" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "total_indices" -> JsNumber(indices.size),
      "closed_indices" -> JsNumber(indices.count { idx => (idx \ "closed").as[Boolean] }),
      "special_indices" -> JsNumber(indices.count { idx => (idx \ "special").as[Boolean] }),
      "indices" -> JsArray(indices),
      "nodes" -> buildNodes(masterNodeId, nodesInfo, nodesStats),
      "shard_allocation" -> JsBoolean(shardAllocation)
    ))
  }

  def buildNodes(masterNodeId: String, nodesInfo: JsValue, nodesStats: JsValue): JsArray =
    JsArray(
      (nodesStats \ "nodes").as[JsObject].value.map {
        case (id, stats) =>
          val info = (nodesInfo \ "nodes" \ id).as[JsObject]
          Node(id, info, stats, masterNodeId)
      }.toSeq
    )

  def buildIndices(clusterState: JsValue, indicesStats: JsValue, aliases: JsValue): Seq[JsValue] = {
    val routingTable = (clusterState \ "routing_table" \ "indices").as[JsObject].value
    val blocks = (clusterState \ "blocks" \ "indices").asOpt[JsObject].getOrElse(Json.obj())
    val stats = (indicesStats \ "indices").asOpt[JsObject].getOrElse(Json.obj())
    val indices = routingTable.map { case (index, shards) =>
      // Since stats and blocks are JsObject objects potentially big, it's checked that key exists in that object.
      // This way, it avoids building a JsUndefined instance with a big string as explained in #467
      val indexStats = if (stats.value contains index) (stats \ index).asOpt[JsObject].getOrElse(Json.obj()) else Json.obj()
      val indexBlock = if (blocks.value contains index ) (blocks \ index).asOpt[JsObject].getOrElse(Json.obj()) else Json.obj()
      val indexAliases = (aliases \ index \ "aliases").asOpt[JsObject].getOrElse(Json.obj()) // 1.4 < does not return aliases obj
      Index(index, indexStats, shards, indexAliases, indexBlock)
    }.toSeq

    val closedIndices = blocks.value.collect { // ES < 7.X does not return routing_table for closed indices
      case (name, block) if !routingTable.contains(name) && (block \ "4").isDefined =>
        ClosedIndex(name)
    }

    indices ++ closedIndices

  }

}
