package controllers

class PutClusterSettings extends ElasticActionController {

  def processElasticRequest = (request, client) => client.putClusterSettings(request.get("settings"), request.host)

}
