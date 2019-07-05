package models.overview

import play.api.libs.json._

object ClosedIndices {

  def apply(clusterState: JsValue) = {
    val blocks = (clusterState \ "blocks" \ "indices").asOpt[JsObject].getOrElse(Json.obj())
    val metadata = (clusterState \ "metadata" \ "indices").as[JsObject]
    blocks.keys.collect {
      case index if (blocks \ index \ "4").asOpt[JsObject].isDefined =>
        Json.obj(
          "name" -> JsString(index),
          "closed" -> JsBoolean(true),
          "special" -> JsBoolean(index.startsWith(".")),
          "aliases" -> (metadata \ index \ "aliases").as[JsArray].value,
          "num_shards" -> JsNumber((metadata \ index \ "settings" \ "index" \ "number_of_shards").as[JsString].value.toInt),
          "num_replicas" -> JsNumber((metadata \ index \ "settings" \ "index" \ "number_of_replicas").as[JsString].value.toInt)
        )
    }
  }
}
