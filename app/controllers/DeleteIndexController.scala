package controllers

import elastic.ElasticClient.deleteIndex

class DeleteIndexController extends ElasticActionController {

  def processElasticRequest = request => deleteIndex(request.get("indices"), request.host)

}
