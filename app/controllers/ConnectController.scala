package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroRequest, CerebroResponse, Hosts}
import play.api.libs.json.{JsArray, JsString}
import play.api.mvc.Controller

import scala.concurrent.ExecutionContext.Implicits.global

class ConnectController @Inject()(val authentication: AuthenticationModule,
                                  elastic: ElasticClient,
                                  hosts: Hosts) extends Controller with AuthSupport {

  def index = AuthAction(authentication) { _ =>
    CerebroResponse(200, JsArray(hosts.getHostNames().map(JsString(_))))
  }

  def connect = AuthAction(authentication).async(parse.json) { request =>
    val req = CerebroRequest(request, hosts)
    elastic.executeRequest("GET", "_cluster/health", None, req.target).map {
      response => CerebroResponse(response.status, response.body)
    }
  }

}
