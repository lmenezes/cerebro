package models

import play.api.libs.json._

object Aliases {

  def apply(json: JsValue): JsValue = {
    // NOTE: ES < 1.5 does not return aliases if no aliases is found
    val indices = json.as[JsObject].value.collect {
      case (index, info) if hasAliases(info) => flattenIndexAliases(index, (info \ "aliases").as[JsObject])
    }.flatten
    JsArray(indices.toSeq)
  }

  def hasAliases(json: JsValue): Boolean =
    (json \ "aliases").asOpt[JsObject].getOrElse(Json.obj()).keys.nonEmpty

  private def flattenIndexAliases(index: String, aliases: JsObject) =
    aliases.keys.map { alias => buildAlias(index, alias, (aliases \ alias).get) }

  private def buildAlias(index: String, alias: String, properties: JsValue): JsValue =
    Json.obj(
      "alias"          -> JsString(alias),
      "index"          -> JsString(index),
      "filter"         -> (properties \ "filter").asOpt[JsValue],
      "search_routing" -> (properties \ "search_routing").asOpt[JsValue],
      "index_routing"  -> (properties \ "index_routing").asOpt[JsValue]
    )
}
