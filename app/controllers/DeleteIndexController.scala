package controllers

import models.ElasticServer

class DeleteIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.deleteIndex(request.get("indices"), ElasticServer(request.host, request.authentication))

}
