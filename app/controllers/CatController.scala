package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroResponse, ElasticServer}

import scala.concurrent.ExecutionContext.Implicits.global

class CatController @Inject()(val authentication: AuthenticationModule,
                              client: ElasticClient) extends BaseController {

  def get = process { request =>
    val api = request.get("api")
    client.catRequest(api, request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

}
