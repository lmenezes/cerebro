package controllers

import elastic.ElasticClient.getIndexMapping

class GetIndexMapping extends ElasticActionController {

  def processElasticRequest = request => getIndexMapping(request.get("index"), request.host)

}
