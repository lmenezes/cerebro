package models

import controllers.auth.AuthRequest
import exceptions.{MissingRequiredParamException, MissingTargetHostException}
import play.api.libs.json.{JsArray, JsObject, JsValue}

class CerebroRequest(val target: ElasticServer, body: JsValue, val user: Option[User]) {

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

  def apply(request: AuthRequest[JsValue], hosts: Hosts) = {
    val body = request.body

    val host = (body \ "host").asOpt[String].getOrElse(throw MissingTargetHostException)
    val knownHost = hosts.getServer(host)
    val cluster = knownHost.getOrElse {
      val username = (body \ "username").asOpt[String]
      val password = (body \ "password").asOpt[String]
      if (username.isDefined && password.isDefined) {
        val auth = ESAuth(username.get, password.get)
        ElasticServer(host, Some(auth))
      } else {
        ElasticServer(host, None)
      }
    }
    new CerebroRequest(cluster, body, request.user)
  }

}
