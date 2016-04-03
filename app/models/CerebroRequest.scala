package models

import exceptions.{MissingRequiredParamException, MissingTargetHostException}
import play.api.libs.json.JsValue

class CerebroRequest(val host: String, body: JsValue) {

  def get(name: String) =
    (body \ name).asOpt[String].getOrElse(throw MissingRequiredParamException(name))

  def getInt(name: String) =
    (body \ name).asOpt[Int].getOrElse(throw MissingRequiredParamException(name))

  def getArray(name: String) = (body \ name).asOpt[Array[String]].getOrElse(throw MissingRequiredParamException(name))

}

object CerebroRequest {

  def apply(body: JsValue) = {
    val host = (body \ "host").asOpt[String].getOrElse(throw MissingTargetHostException)
    new CerebroRequest(host, body)
  }

}
