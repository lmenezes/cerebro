package controllers

import models.ElasticServer

class ForceMergeController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.forceMerge(request.get("indices"), ElasticServer(request.host, request.authentication))

}
