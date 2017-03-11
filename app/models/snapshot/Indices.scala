package models.snapshot

import play.api.libs.json.{JsArray, JsString, JsValue, Json}

object Indices {

  def apply(data: JsValue) = JsArray(data.as[JsArray].value.collect {
    case index =>
      val name = (index \ "index").as[String]
      Json.obj(
        "name" -> JsString(name),
        "special" -> name.startsWith(".")
      )
  })

}
