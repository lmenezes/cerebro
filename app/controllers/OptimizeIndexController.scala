package controllers

import elastic.ElasticClient.optimizeIndex

class OptimizeIndexController extends ElasticActionController {

  def processElasticRequest = request => optimizeIndex(request.get("indices"), request.host)

}
