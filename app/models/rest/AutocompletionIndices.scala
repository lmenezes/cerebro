package models.rest

import play.api.libs.json.{JsArray, JsObject, JsString, JsValue}

object AutocompletionIndices {

  def apply(aliases: JsValue): JsArray =
    JsArray(
      aliases.as[JsObject].value.flatMap {
        case (idx, data) => (data \ "aliases").as[JsObject].keys ++ Set(idx)
      }.toSeq.distinct.map(JsString)
    )

}