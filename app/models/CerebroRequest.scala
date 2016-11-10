package models

import exceptions.{MissingRequiredParamException, MissingTargetHostException}
import play.api.libs.json.{JsArray, JsObject, JsValue}

class CerebroRequest(val host: String, val authentication: Option[ESAuth], body: JsValue) {

  def get(name: String) =
    (body \ name).asOpt[String].getOrElse(throw MissingRequiredParamException(name))

  def getOpt(name: String) =
    (body \ name).asOpt[String]

  def getInt(name: String) =
    (body \ name).asOpt[Int].getOrElse(throw MissingRequiredParamException(name))

  def getBoolean(name: String) =
    (body \ name).asOpt[Boolean].getOrElse(throw MissingRequiredParamException(name))

  def getArray(name: String) = (body \ name).asOpt[Array[String]].getOrElse(throw MissingRequiredParamException(name))

  def getObj(name: String) =
    (body \ name).asOpt[JsObject].getOrElse(throw MissingRequiredParamException(name))

  def getObjOpt(name: String) =
    (body \ name).asOpt[JsValue]

  def getOptArray(name: String): Option[JsArray] =
    (body \ name).asOpt[JsArray]

  def getAsStringArray(name: String): Option[Array[String]] =
    (body \ name).asOpt[Array[String]]

}

object CerebroRequest {

  def apply(body: JsValue) = {
    val host = (body \ "host").asOpt[String].getOrElse(throw MissingTargetHostException)
    val username = (body \ "username").asOpt[String]
    val password = (body \ "password").asOpt[String]
    val auth = {
      if (username.isDefined && password.isDefined) {
        Some(ESAuth(username.get, password.get))
      } else {
        None
      }
    }
    new CerebroRequest(host, auth, body)
  }

}
