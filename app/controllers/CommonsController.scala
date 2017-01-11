package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.ElasticServer
import models.commons.{Indices, Nodes}

import scala.concurrent.ExecutionContext.Implicits.global

class CommonsController @Inject()(val authentication: AuthenticationModule,
                                  client: ElasticClient) extends BaseController {

  def indices = process { request =>
    client.getIndices(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Indices(response.body))
    }
  }

  def nodes = process { request =>
    client.getNodes(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Nodes(response.body))
    }
  }

  def getIndexSettings = process { request =>
    client.getIndexSettings(request.get("index"), ElasticServer(request.host, request.authentication)) map { response =>
      Status(response.status)(response.body)
    }
  }

  def getIndexMappings = process { request =>
    client.getIndexMapping(request.get("index"), ElasticServer(request.host, request.authentication)) map { response =>
      Status(response.status)(response.body)
    }
  }

  def getNodeStats = process { request =>
    client.nodeStats(request.get("node"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
