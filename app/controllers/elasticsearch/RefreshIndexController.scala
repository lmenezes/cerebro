package controllers.elasticsearch

import elastic.ElasticClient

class RefreshIndexController extends ElasticsearchController {

  def index(indices: String) = processRequest(ElasticClient.refreshIndex(indices, _))

}
