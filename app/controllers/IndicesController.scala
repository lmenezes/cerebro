package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error, Success}
import models.nodes.Nodes
import models.{CerebroResponse, Hosts}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class IndicesController @Inject()(val authentication: AuthenticationModule,
                                val hosts: Hosts,
                                client: ElasticClient) extends BaseController {
  def index = process { request =>
    client.getIndicesStats(request.target).map {
      case Success(status, repositories) => CerebroResponse(status, repositories)
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

}
