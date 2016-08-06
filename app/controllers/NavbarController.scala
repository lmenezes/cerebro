package controllers

import models.ElasticServer
import scala.concurrent.ExecutionContext.Implicits.global

class NavbarController extends BaseController {

  def index = process { (request, client) =>
    client.clusterHealth(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
