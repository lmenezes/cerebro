package controllers

import models.ElasticServer

class CloseIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.closeIndex(request.get("indices"), ElasticServer(request.host, request.authentication))

}
