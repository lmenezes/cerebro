package controllers

import elastic.ElasticClient.getIndexSettings

class GetIndexSettings extends ElasticActionController {

  def processElasticRequest = request => getIndexSettings(request.get("index"), request.host)

}
