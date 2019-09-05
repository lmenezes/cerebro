package models.overview

import play.api.libs.json.{JsBoolean, JsNumber, JsString, JsValue, Json}

object ClosedIndex {

  def apply(name: String, aliases: JsValue, numShards: JsNumber, numReplicas: JsNumber) =
    Json.obj(
      "name" -> JsString(name),
      "closed" -> JsBoolean(true),
      "special" -> JsBoolean(name.startsWith(".")),
      "aliases" -> aliases,
      "num_shards" -> numShards,
      "num_replicas" -> numReplicas
    )

}
