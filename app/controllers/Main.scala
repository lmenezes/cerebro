package controllers

import controllers.elasticsearch.ElasticsearchController
import elastic.ElasticClient

object Main extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.main(request.host) }

}
