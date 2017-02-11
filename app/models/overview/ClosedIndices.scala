package models.overview

import play.api.libs.json._

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
