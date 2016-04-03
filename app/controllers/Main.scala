package controllers

class Main extends ElasticActionController {

  def processElasticRequest = (request, client) => client.main(request.host)

}
