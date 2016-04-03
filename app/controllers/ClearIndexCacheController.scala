package controllers

class ClearIndexCacheController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.clearIndexCache(request.get("indices"), request.host)

}
