package controllers

import elastic.ElasticClient.putClusterSettings

class PutClusterSettings extends ElasticActionController {

  def processElasticRequest = request => putClusterSettings(request.get("settings"), request.host)

}
