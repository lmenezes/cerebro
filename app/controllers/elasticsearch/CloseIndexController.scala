package controllers.elasticsearch


import elastic.ElasticClient

class CloseIndexController extends ElasticsearchController {

  def index(indices: String) = processRequest(ElasticClient.closeIndex(indices, _))

}
