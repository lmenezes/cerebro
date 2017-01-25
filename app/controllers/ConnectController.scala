package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.CerebroResponse
import play.api.Configuration
import play.api.libs.json.{JsArray, Json}
import play.api.mvc.Controller


class ConnectController @Inject()(val authentication: AuthenticationModule,
                                  config: Configuration,
                                  client: ElasticClient) extends Controller with AuthSupport {

  def index = AuthAction(authentication) {
    request => {
      val hosts = config.getConfigSeq("hosts") match {
        case Some(hostsConfig) =>
          hostsConfig.map { hostConfig =>
            val username = hostConfig.getString("auth.username")
            val password = hostConfig.getString("auth.password")
            (username, password) match {
              case (Some(username), Some(password)) =>
                Json.obj(
                  "host" -> hostConfig.getString("host").get,
                  "username" -> username,
                  "password" -> password
                )
              case _ =>
                Json.obj("host" -> hostConfig.getString("host").get)
            }
          }
        case None =>
          Seq()
      }
      CerebroResponse(200, JsArray(hosts))
    }
  }

}
