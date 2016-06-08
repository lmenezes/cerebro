package controllers

import models.ElasticServer

class GetIndexSettingsController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.getIndexSettings(request.get("index"), ElasticServer(request.host, request.authentication))

}
