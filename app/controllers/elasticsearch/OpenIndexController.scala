package controllers.elasticsearch


import elastic.ElasticClient

class OpenIndexController extends ElasticsearchController {

  def index(indices: String) = processRequest(ElasticClient.openIndex(indices, _))

}
