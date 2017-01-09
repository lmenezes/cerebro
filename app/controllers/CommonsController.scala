package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.ElasticServer
import models.commons.{Indices, Nodes}

import scala.concurrent.ExecutionContext.Implicits.global

class CommonsController @Inject()(val authentication: AuthenticationModule) extends BaseController {

  def indices = process { (request, client) =>
    client.getIndices(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Indices(response.body))
    }
  }

  def nodes = process { (request, client) =>
    client.getNodes(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Nodes(response.body))
    }
  }

  def getIndexSettings = process { (request, client) =>
    client.getIndexSettings(request.get("index"), ElasticServer(request.host, request.authentication)) map { response =>
      Status(response.status)(response.body)
    }
  }

  def getIndexMappings = process { (request, client) =>
    client.getIndexMapping(request.get("index"), ElasticServer(request.host, request.authentication)) map { response =>
      Status(response.status)(response.body)
    }
  }

  def getNodeStats = process { (request, client) =>
    client.nodeStats(request.get("node"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
