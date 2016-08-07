package models.commons

import play.api.libs.json.{JsArray, JsString, JsValue}

object Indices {

  def apply(data: JsValue) = JsArray(data.as[JsArray].value.collect {
    case index => (index \ "index").as[JsString]
  })

}
