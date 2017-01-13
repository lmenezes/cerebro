package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroResponse, ClusterMapping}

import scala.concurrent.ExecutionContext.Implicits.global

class RestController @Inject()(val authentication: AuthenticationModule,
                               client: ElasticClient) extends BaseController {

  def request = process { request =>
    client.executeRequest(
      request.get("method"),
      request.get("path"),
      request.getObjOpt("data"),
      request.target
    ).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def getClusterMapping = process { request =>
    client.getClusterMapping(request.target).map {
      response => CerebroResponse(200, ClusterMapping(response.body))
    }
  }

}
