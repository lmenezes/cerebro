package controllers.elasticsearch

import elastic.ElasticClient

class GetIndexSettings extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.getIndexSettings(request.get("index"), request.host) }

}
