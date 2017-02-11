package models.overview

import play.api.libs.json._

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
