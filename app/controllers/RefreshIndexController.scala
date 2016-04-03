package controllers

import elastic.ElasticClient.refreshIndex

class RefreshIndexController extends ElasticActionController {

  def processElasticRequest = request => refreshIndex(request.get("indices"), request.host)

}
