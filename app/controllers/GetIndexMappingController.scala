package controllers

import models.ElasticServer

class GetIndexMappingController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.getIndexMapping(request.get("index"), ElasticServer(request.host, request.authentication))

}
