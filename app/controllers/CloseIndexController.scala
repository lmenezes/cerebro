package controllers

class CloseIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.closeIndex(request.get("indices"), request.host)

}
