package controllers

import models.ElasticServer

class ClearIndexCacheController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.clearIndexCache(request.get("indices"), ElasticServer(request.host, request.authentication))

}
