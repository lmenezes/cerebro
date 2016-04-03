package controllers

class NodeStatsController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.nodesStats(request.get("node"), request.host)

}
