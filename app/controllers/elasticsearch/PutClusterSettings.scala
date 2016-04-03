package controllers.elasticsearch

import elastic.ElasticClient

class PutClusterSettings extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.putClusterSettings(request.get("settings"), request.host) }

}
