package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.ElasticServer

import scala.concurrent.ExecutionContext.Implicits.global

class NavbarController @Inject()(val authentication: AuthenticationModule,
                                 client: ElasticClient) extends BaseController {

  def index = process { request =>
    client.clusterHealth(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
