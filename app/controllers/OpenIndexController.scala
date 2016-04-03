package controllers

import elastic.ElasticClient.openIndex

class OpenIndexController extends ElasticActionController {

  def processElasticRequest = request => openIndex(request.get("indices"), request.host)

}
