package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{ClusterMapping, ElasticServer}

import scala.concurrent.ExecutionContext.Implicits.global

class RestController @Inject()(val authentication: AuthenticationModule,
                               client: ElasticClient) extends BaseController {

  def request = process { request =>
    client.executeRequest(
      request.get("method"),
      request.get("path"),
      request.getObjOpt("data"),
      ElasticServer(request.host, request.authentication)
    ).map { response =>
      Status(response.status)(response.body)
    }
  }

  def getClusterMapping = process { request =>
    client.getClusterMapping(ElasticServer(request.host, request.authentication)).map {
      response => Ok(ClusterMapping(response.body))
    }
  }

}
