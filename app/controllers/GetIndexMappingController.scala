package controllers

class GetIndexMappingController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.getIndexMapping(request.get("index"), request.host)

}
