package models.nodes

import models.commons.{NodeInfo, NodeRoles}
import play.api.libs.json._

object Node extends NodeInfo {

  def apply(id: String, currentMaster: Boolean, info: JsValue, stats: JsValue): JsValue = {
    val jvmVersion = (info \ "jvm" \ "version").asOpt[JsString].getOrElse(JsNull)

    Json.obj(
      "id" -> JsString(id),
      "current_master" -> JsBoolean(currentMaster),
      "name" -> (stats \ "name").as[JsValue],
      "host" -> (stats \ "host").asOpt[JsValue],
      "heap" -> heap(stats),
      "disk" -> disk(stats),
      "cpu" -> cpu(stats),
      "uptime" -> (stats \ "jvm" \ "uptime_in_millis").as[JsValue],
      "jvm" -> jvmVersion,
      "attributes" -> attrs(info),
      "version" -> (info \ "version").as[JsValue]
    ) ++ roles(info)
  }

  private def roles(info: JsValue): JsObject = {
    val roles = NodeRoles(info)
    Json.obj(
      "master" -> JsBoolean(roles.master),
      "coordinating" -> JsBoolean(roles.coordinating),
      "ingest" -> JsBoolean(roles.ingest),
      "data" -> JsBoolean(roles.data)
    )
  }

  private def cpu(stats: JsValue): JsValue = {
    val load = (stats \ "os" \ "cpu" \ "load_average" \ "1m").asOpt[JsValue].getOrElse(// 5.X
      (stats \ "os" \ "load_average").asOpt[JsValue].getOrElse(JsNull) // FIXME: 2.X
    )
    val osCpu = (stats \ "os" \ "cpu" \ "percent").asOpt[JsValue].getOrElse(// 5.X
      (stats \ "os" \ "cpu_percent").asOpt[JsValue].getOrElse(JsNull) // FIXME 2.X
    )
    Json.obj(
      "process" -> (stats \ "process" \ "cpu" \ "percent").as[JsValue],
      "os" -> osCpu,
      "load" -> load
    )
  }

  private def disk(stats: JsValue): JsValue = {
    val total = (stats \ "fs" \ "total" \ "total_in_bytes").asOpt[Long]
    val available = (stats \ "fs" \ "total" \ "available_in_bytes").asOpt[Long]
    (total, available) match {
      case (Some(t), Some(a)) =>
        val percent = Math.round((1 - (a.toFloat / t.toFloat)) * 100)
        Json.obj(
          "total" -> JsNumber(t),
          "available" -> JsNumber(a),
          "percent" -> JsNumber(percent)
        )
      case _ => JsNull
    }
  }

  private def heap(stats: JsValue): JsValue =
    Json.obj(
      "max" -> (stats \ "jvm" \ "mem" \ "heap_max").as[JsValue],
      "used" -> (stats \ "jvm" \ "mem" \ "heap_used").as[JsValue],
      "percent" -> (stats \ "jvm" \ "mem" \ "heap_used_percent").as[JsValue]
    )

}
