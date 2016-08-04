package models.analysis

import play.api.libs.json.JsValue

object Tokens {

  def apply(data: JsValue) = (data \ "tokens").as[JsValue]

}
