package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error, Success}
import models.commons.{Indices, Nodes}
import models.{CerebroResponse, Hosts}

import scala.concurrent.ExecutionContext.Implicits.global

class CommonsController @Inject()(val authentication: AuthenticationModule,
                                  val hosts: Hosts,
                                  client: ElasticClient) extends BaseController {

  def indices = process { request =>
    client.getIndices(request.target).map {
      case Success(status, indices) => CerebroResponse(status, Indices(indices))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

  def nodes = process { request =>
    client.getNodes(request.target).map {
      case Success(status, nodes) => CerebroResponse(status, Nodes(nodes))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

  def getIndexSettings = process { request =>
    client.getIndexSettings(request.get("index"), request.target) map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def getIndexMappings = process { request =>
    client.getIndexMapping(request.get("index"), request.target) map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def getNodeStats = process { request =>
    client.nodeStats(request.get("node"), request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def getIndexStats = process { request =>
    client.indexStats(request.get("index"), request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

}
