package models.analysis

import play.api.libs.json.{JsArray, JsString, JsValue}

object OpenIndices {

  def apply(data: JsValue) = JsArray(data.as[JsArray].value.collect {
    case index if (index \ "status").as[String].equals("open") => (index \ "index").as[JsString]
  })

}
