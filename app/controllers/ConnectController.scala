package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import play.api.Play
import play.api.libs.json.{JsArray, Json}
import play.api.mvc.Controller


class ConnectController @Inject()(val authentication: AuthenticationModule,
                                  client: ElasticClient) extends Controller with AuthSupport {

  def index = AuthAction(authentication) {
    request => {
      val hosts = Play.current.configuration.getConfigSeq("hosts") match {
        case Some(configs) =>
          configs.map { config =>
            val username = config.getString("auth.username")
            val password = config.getString("auth.password")
            (username, password) match {
              case (Some(username), Some(password)) =>
                Json.obj(
                  "host" -> config.getString("host").get,
                  "username" -> username,
                  "password" -> password
                )
              case _ =>
                Json.obj("host" -> config.getString("host").get)
            }
          }
        case None =>
          Seq()
      }
      Ok(JsArray(hosts))
    }
  }

}
