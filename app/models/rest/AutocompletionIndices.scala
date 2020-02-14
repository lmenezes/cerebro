package models.rest

import play.api.libs.json.{JsArray, JsObject, JsString, JsValue}

object AutocompletionIndices {

  def apply(mappings: JsValue): JsArray =
    JsArray(mappings.as[JsObject].value.keys.map(i => JsString(i)).toSeq)

}
