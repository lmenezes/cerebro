package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.{CerebroResponse, Hosts}
import play.api.libs.json.{JsArray, JsString}
import play.api.mvc.Controller


class ConnectController @Inject()(val authentication: AuthenticationModule,
                                  hosts: Hosts) extends Controller with AuthSupport {

  def index = AuthAction(authentication) { request =>
    CerebroResponse(200, JsArray(hosts.getHostNames().map(JsString(_))))
  }

}
