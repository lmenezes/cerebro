package controllers

import models.ElasticServer
import models.commons.Indices
import scala.concurrent.ExecutionContext.Implicits.global

class CommonsController extends BaseController {

  def indices = process { (request, client) =>
    client.getIndices(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Indices(response.body))
    }
  }

}
