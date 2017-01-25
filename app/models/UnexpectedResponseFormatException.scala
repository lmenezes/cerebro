package models

import play.api.libs.json.JsValue

case class UnexpectedResponseFormatException(response: JsValue) extends RuntimeException(s"Unexpected format for [${response.toString}]")
