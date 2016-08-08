package models.commons

import play.api.libs.json.{JsArray, JsString, JsValue}

object Nodes {

  def apply(data: JsValue) = JsArray(data.as[JsArray].value.collect {
    case node => (node \ "name").as[JsString]
  })

}
