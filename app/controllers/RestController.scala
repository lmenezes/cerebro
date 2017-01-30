package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error, Success}
import models.{CerebroResponse, ClusterMapping, Hosts}

import scala.concurrent.ExecutionContext.Implicits.global

class RestController @Inject()(val authentication: AuthenticationModule,
                               val hosts: Hosts,
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
      case Success(status, mapping) => CerebroResponse(status, ClusterMapping(mapping))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

}
