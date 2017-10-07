package models.commons

import play.api.libs.json.{JsArray, JsValue}

object Indices {

  def apply(data: JsValue) = JsArray((data \\ "index"))

}
