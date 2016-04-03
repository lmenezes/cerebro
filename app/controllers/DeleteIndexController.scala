package controllers

class DeleteIndexController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.deleteIndex(request.get("indices"), request.host)

}
