package controllers

import play.api.Play
import play.api.libs.json.{JsArray, Json}
import play.api.mvc.{Action, Controller}


class ConnectController extends Controller {

  def index = Action {
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
