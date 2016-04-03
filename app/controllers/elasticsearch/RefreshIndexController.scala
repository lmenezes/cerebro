package controllers.elasticsearch

import elastic.ElasticClient

class RefreshIndexController extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.refreshIndex(request.get("indices"), request.host) }

}
