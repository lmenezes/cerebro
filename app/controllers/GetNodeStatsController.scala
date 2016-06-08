package controllers

import models.ElasticServer

class GetNodeStatsController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.nodeStats(request.get("node"), ElasticServer(request.host, request.authentication))

}
