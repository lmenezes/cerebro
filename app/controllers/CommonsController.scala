package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroResponse, ElasticServer}
import models.commons.{Indices, Nodes}

import scala.concurrent.ExecutionContext.Implicits.global

class CommonsController @Inject()(val authentication: AuthenticationModule,
                                  client: ElasticClient) extends BaseController {

  def indices = process { request =>
    client.getIndices(request.target).map { response =>
      CerebroResponse(response.status, Indices(response.body))
    }
  }

  def nodes = process { request =>
    client.getNodes(request.target).map { response =>
      CerebroResponse(response.status, Nodes(response.body))
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

}
