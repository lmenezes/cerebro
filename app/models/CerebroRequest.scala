package models

import controllers.auth.AuthRequest
import exceptions.{MissingRequiredParamException, MissingTargetHostException}
import play.api.libs.json.{JsArray, JsObject, JsValue}

case class CerebroRequest(val target: ElasticServer, body: JsValue, val user: Option[User]) {

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

  def apply(request: AuthRequest[JsValue], hosts: Hosts): CerebroRequest = {
    val body = request.body

    val hostName = (body \ "host").asOpt[String].getOrElse(throw MissingTargetHostException)
    val username = (body \ "username").asOpt[String]
    val password = (body \ "password").asOpt[String]

    val requestAuth = (username, password) match {
      case (Some(u), Some(p)) => Some(ESAuth(u, p))
      case _ => None
    }

    // Add default headers if host is set with wildcard. Add default authorization(same with kibana)
    val defaultHeadersWhitelist: Seq[String] = hosts.getHost("*") match {
      case Some(Host(_, _, headers)) => headers
      case _ => Seq("Authorization")
    }

    val server = hosts.getHost(hostName) match {
      case Some(host @ Host(h, a, headersWhitelist)) =>
        val headers = headersWhitelist.flatMap(headerName => request.headers.get(headerName).map(headerName -> _))
        ElasticServer(host.copy(authentication = a.orElse(requestAuth)), headers)
      case None =>
        val headers = defaultHeadersWhitelist.flatMap(headerName => request.headers.get(headerName).map(headerName -> _))
        ElasticServer(Host(hostName, requestAuth), headers)
    }

    CerebroRequest(server, body, request.user)
  }

}
