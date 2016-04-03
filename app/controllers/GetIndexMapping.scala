package controllers

class GetIndexMapping extends ElasticActionController {

  def processElasticRequest = (request, client) => client.getIndexMapping(request.get("index"), request.host)

}
