package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.ElasticServer

import scala.concurrent.ExecutionContext.Implicits.global

class CatController @Inject()(val authentication: AuthenticationModule) extends BaseController {

  def get = process { (request, client) =>
    val api = request.get("api")
    client.catRequest(api, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
