package services.overview

import models.commons.NodeRoles
import play.api.libs.json._

object Node {

  def apply(data: JsValue) = {

    val nodeRoles = NodeRoles((data \ "node.role").as[String])

    // Not available on AWS
    val ip = (data \ "ip").asOpt[JsValue].getOrElse(JsNull)
    val jdk = (data \ "jdk").asOpt[JsValue].getOrElse(JsNull)

    // Not available on ES < 5.5
    val load = (data \ "load_1m").asOpt[JsValue].getOrElse(JsNull)
    val diskTotal = (data \ "disk.total").asOpt[JsValue].getOrElse(JsNull)
    val diskPercent = (data \ "disk.used_percent").asOpt[JsValue].getOrElse(JsNull)

    Json.obj(
      "id" -> (data \ "id").as[JsValue],
      "current_master" -> JsBoolean((data \ "master").as[String].equals("*")),
      "name" -> (data \ "name").as[JsValue],
      "ip" -> ip,
      "jvm_version" -> jdk,
      "es_version" -> (data\ "version").as[JsValue],
      "load_1m" -> load,
      "cpu" -> (data \ "cpu").as[JsValue],
      "master" -> JsBoolean(nodeRoles.master),
      "data" -> JsBoolean(nodeRoles.data),
      "coordinating" -> JsBoolean(nodeRoles.coordinating),
      "ingest" -> JsBoolean(nodeRoles.ingest),
      "heap" -> Json.obj(
        "current" -> (data \ "heap.current").as[JsValue],
        "percent" -> (data \ "heap.percent").as[JsValue],
        "max" -> (data \ "heap.max").as[JsValue]
      ),
      "disk" -> Json.obj(
        "total" -> diskTotal,
        "avail" -> (data \ "disk.avail").as[JsValue],
        "percent" -> diskPercent
      )
    )
  }

}
