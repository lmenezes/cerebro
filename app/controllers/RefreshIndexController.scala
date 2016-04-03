package controllers

class RefreshIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.refreshIndex(request.get("indices"), request.host)

}
