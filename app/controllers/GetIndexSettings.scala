package controllers

class GetIndexSettings extends ElasticActionController {

  def processElasticRequest = (request, client) => client.getIndexSettings(request.get("index"), request.host)

}
