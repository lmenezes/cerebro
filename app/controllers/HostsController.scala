package controllers

import play.api.Play
import play.api.libs.json.{JsArray, JsString}
import play.api.mvc.{Action, Controller}


class HostsController extends Controller {

  def index = Action {
    request => {
      val hosts = Play.current.configuration.getConfigSeq("hosts") match {
        case Some(a) => a.map { b => b.getString("host").get }
        case None => Seq()
      }
      Ok(JsArray(hosts.map(JsString(_))))
    }
  }

}
