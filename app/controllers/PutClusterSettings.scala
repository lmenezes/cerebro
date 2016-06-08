package controllers

import models.ElasticServer

class PutClusterSettings extends ElasticActionController {

  def processElasticRequest = (request, client) => client.putClusterSettings(request.get("settings"), ElasticServer(request.host, request.authentication))

}
