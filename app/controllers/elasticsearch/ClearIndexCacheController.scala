package controllers.elasticsearch

import elastic.ElasticClient

class ClearIndexCacheController extends ElasticsearchController {

  def index(indices: String) = processRequest(ElasticClient.clearIndexCache(indices, _))

}
