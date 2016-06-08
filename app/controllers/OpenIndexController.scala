package controllers

import models.ElasticServer

class OpenIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.openIndex(request.get("indices"), ElasticServer(request.host, request.authentication))

}
