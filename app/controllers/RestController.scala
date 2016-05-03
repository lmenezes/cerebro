package controllers

class RestController extends ElasticActionController {

  def processElasticRequest = (request, client) => {
    client.executeRequest(
      request.get("method"),
      request.get("path"),
      request.getOpt("data"),
      request.host
    )
  }

}
