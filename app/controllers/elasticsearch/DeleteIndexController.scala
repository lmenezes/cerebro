package controllers.elasticsearch


import elastic.ElasticClient

class DeleteIndexController extends ElasticsearchController {

  def index(indices: String) = processRequest(ElasticClient.deleteIndex(indices, _))

}
