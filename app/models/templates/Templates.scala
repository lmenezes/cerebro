package models.templates

import play.api.libs.json._

object Templates {

  def apply(json: JsValue): JsValue = {
    val names = json.as[JsObject].keys
    JsArray(names.map { name =>
      Json.obj("name" -> name, "template" -> (json \ name).as[JsValue])
    }.toSeq)
  }

}
