package controllers

import models.ElasticServer

class RefreshIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.refreshIndex(request.get("indices"), ElasticServer(request.host, request.authentication))

}
