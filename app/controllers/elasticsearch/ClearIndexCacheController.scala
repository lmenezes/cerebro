package controllers.elasticsearch

import elastic.ElasticClient

class ClearIndexCacheController extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.clearIndexCache(request.get("indices"), request.host) }

}
