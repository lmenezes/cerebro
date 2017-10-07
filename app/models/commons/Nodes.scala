package models.commons

import play.api.libs.json.{JsArray, JsValue}

object Nodes {

  def apply(data: JsValue): JsArray = JsArray((data \\ "name"))

}
