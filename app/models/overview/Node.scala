package models.overview

import models.commons.{NodeInfo, NodeRoles}
import play.api.libs.json._

object Node extends NodeInfo {

  def apply(id: String, info: JsValue, stats: JsValue, masterNodeId: String) = {
    val nodeRoles = NodeRoles(stats)


    // AWS nodes return no host/ip info
    val host = (stats \ "host").asOpt[JsString].getOrElse(JsNull)
    val ip = (stats \ "ip").asOpt[JsString].getOrElse(JsNull)
    val jvmVersion = (info \ "jvm" \ "version").asOpt[JsString].getOrElse(JsNull)

    Json.obj(
      "id" -> JsString(id),
      "current_master" -> JsBoolean(id.equals(masterNodeId)),
      "name" -> (stats \ "name").as[JsString],
      "host" -> host,
      "ip" -> ip,
      "es_version" -> (info \ "version").as[JsString],
      "jvm_version" -> jvmVersion,
      "load_average" -> loadAverage(stats),
      "available_processors" -> (info \ "os" \ "available_processors").as[JsNumber],
      "cpu_percent" -> cpuPercent(stats),
      "master" -> JsBoolean(nodeRoles.master),
      "data" -> JsBoolean(nodeRoles.data),
      "coordinating" -> JsBoolean(nodeRoles.coordinating),
      "ingest" -> JsBoolean(nodeRoles.ingest),
      "heap" -> Json.obj(
        "used" -> (stats \ "jvm" \ "mem" \ "heap_used_in_bytes").as[JsNumber],
        "committed" -> (stats \ "jvm" \ "mem" \ "heap_committed_in_bytes").as[JsNumber],
        "used_percent" -> (stats \ "jvm" \ "mem" \ "heap_used_percent").as[JsNumber],
        "max" -> (stats \ "jvm" \ "mem" \ "heap_max_in_bytes").as[JsNumber]
      ),
      "disk" -> disk(stats),
      "attributes" -> attrs(info)
    )
  }

  def disk(stats: JsValue): JsObject = {
    val totalInBytes = (stats \ "fs" \ "total" \ "total_in_bytes").asOpt[Long].getOrElse(0L)
    val freeInBytes = (stats \ "fs" \ "total" \ "free_in_bytes").asOpt[Long].getOrElse(0L)
    val usedPercent = 100 - (100 * (freeInBytes.toFloat / totalInBytes.toFloat)).toInt
    Json.obj(
      "total" -> JsNumber(totalInBytes),
      "free" -> JsNumber(freeInBytes),
      "used_percent" -> JsNumber(usedPercent)
    )
  }

  def loadAverage(nodeStats: JsValue): JsNumber = {
    val load = (nodeStats \ "os" \ "cpu" \ "load_average" \ "1m").asOpt[Float].getOrElse(// 5.X
      (nodeStats \ "os" \ "load_average").asOpt[Float].getOrElse(0f) // FIXME: 2.X
    )
    JsNumber(BigDecimal(load.toDouble))
  }

  def cpuPercent(nodeStats: JsValue): JsNumber = {
    val cpu = (nodeStats \ "os" \ "cpu" \ "percent").asOpt[Int].getOrElse(// 5.X
      (nodeStats \ "os" \ "cpu_percent").asOpt[Int].getOrElse(0) // FIXME 2.X
    )
    JsNumber(BigDecimal(cpu))
  }

}
