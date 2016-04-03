package controllers

import elastic.ElasticClient.clearIndexCache

class ClearIndexCacheController extends ElasticActionController {

  def processElasticRequest = request => clearIndexCache(request.get("indices"), request.host)

}
