package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.ElasticServer

import scala.concurrent.ExecutionContext.Implicits.global

class NavbarController @Inject()(val authentication: AuthenticationModule) extends BaseController {

  def index = process { (request, client) =>
    client.clusterHealth(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
