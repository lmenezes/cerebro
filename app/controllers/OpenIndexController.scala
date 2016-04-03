package controllers

class OpenIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.openIndex(request.get("indices"), request.host)

}
