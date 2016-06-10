package models

import play.api.libs.json._

object Aliases {

  def apply(json: JsValue): JsValue = {
    val indices = json.as[JsObject].keys.filter {
      index => (json \ index \ "aliases").as[JsObject].keys.nonEmpty
    }
    JsArray(indices.flatMap { index => flattenIndexAliases(index, (json \ index \ "aliases").as[JsObject]) }.toSeq)
  }

  private def flattenIndexAliases(index: String, aliases: JsObject) =
    aliases.keys.map { alias =>
      buildAlias(index, alias, (aliases \ alias).get)
    }

  private def buildAlias(index: String, alias: String, properties: JsValue): JsValue =
    Json.obj(
      "alias" -> JsString(alias),
      "index" -> JsString(index),
      "filter" -> (properties \ "filter").asOpt[JsValue],
      "search_routing" -> (properties \ "search_routing").asOpt[JsValue],
      "index_routing" -> (properties \ "index_routing").asOpt[JsValue]
    )
}
