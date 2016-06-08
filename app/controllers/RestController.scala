package controllers

import models.ElasticServer

class RestController extends ElasticActionController {

  def processElasticRequest = (request, client) => {
    client.executeRequest(
      request.get("method"),
      request.get("path"),
      request.getOpt("data"),
      ElasticServer(request.host, request.authentication)
    )
  }

}
