package models

import play.api.libs.json.{Json, JsString, JsObject, JsValue}

object ClusterMapping {

  def apply(mappings: JsValue) = JsObject(mappings.as[JsObject].value.map {
    case (index, indexMappings) =>
      (index -> Json.obj("types" -> (indexMappings \ "mappings").as[JsObject].keys.map(JsString(_))))
  })

}
