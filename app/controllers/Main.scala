package controllers

import controllers.elasticsearch.ElasticsearchController
import elastic.ElasticClient

object Main extends ElasticsearchController {

  def index = processRequest(ElasticClient.main(_))

}
