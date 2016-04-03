package controllers

import elastic.ElasticClient.closeIndex

class CloseIndexController extends ElasticActionController {

  def processElasticRequest = request => closeIndex(request.get("indices"), request.host)

}
