package controllers

import elastic.ElasticClient.nodesStats

class NodeStatsController extends ElasticActionController {

  def processElasticRequest = request => nodesStats(request.get("node"), request.host)

}
