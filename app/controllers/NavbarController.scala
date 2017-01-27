package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroResponse, Hosts}
import play.api.libs.json.{JsObject, Json}

import scala.concurrent.ExecutionContext.Implicits.global

class NavbarController @Inject()(val authentication: AuthenticationModule,
                                 val hosts: Hosts,
                                 client: ElasticClient) extends BaseController {

  def index = process { request =>
    client.clusterHealth(request.target).map { response =>
      val body = request.user.fold(response.body) { user =>
        response.body.as[JsObject] ++ Json.obj("username" -> user.name)
      }
      CerebroResponse(response.status, body)
    }
  }

}
