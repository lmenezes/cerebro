package controllers

import elastic.ElasticClient

class Main extends ElasticActionController {

  def processElasticRequest = request => ElasticClient.main(request.host)

}
