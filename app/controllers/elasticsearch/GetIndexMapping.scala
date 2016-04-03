package controllers.elasticsearch

import elastic.ElasticClient

class GetIndexMapping extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.getIndexMapping(request.get("index"), request.host) }

}
