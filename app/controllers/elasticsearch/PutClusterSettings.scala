package controllers.elasticsearch

import elastic.ElasticClient

class PutClusterSettings extends ElasticsearchController {

  def index = processRequest(ElasticClient.putClusterSettings("", _))

}
