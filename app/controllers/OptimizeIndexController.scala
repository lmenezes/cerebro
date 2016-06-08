package controllers

import models.ElasticServer

class OptimizeIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.optimizeIndex(request.get("indices"), ElasticServer(request.host, request.authentication))

}
