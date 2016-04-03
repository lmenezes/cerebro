package controllers

class OptimizeIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.optimizeIndex(request.get("indices"), request.host)

}
