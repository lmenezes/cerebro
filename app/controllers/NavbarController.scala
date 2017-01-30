package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error, Success}
import models.{CerebroResponse, Hosts}
import play.api.libs.json.{JsObject, Json}

import scala.concurrent.ExecutionContext.Implicits.global

class NavbarController @Inject()(val authentication: AuthenticationModule,
                                 val hosts: Hosts,
                                 client: ElasticClient) extends BaseController {

  def index = process { request =>
    client.clusterHealth(request.target).map {
      case Success(status, health) =>
        val body = request.user.fold(health) { user =>
          health.as[JsObject] ++ Json.obj("username" -> user.name)
        }
        CerebroResponse(status, body)

      case Error(status, error) =>
        CerebroResponse(status, error)
    }
  }

}
