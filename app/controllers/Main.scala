package controllers

import models.ElasticServer

class Main extends ElasticActionController {

  def processElasticRequest = (request, client) => client.main(ElasticServer(request.host, request.authentication))

}
