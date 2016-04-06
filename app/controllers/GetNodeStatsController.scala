package controllers

class GetNodeStatsController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.nodeStats(request.get("node"), request.host)

}
