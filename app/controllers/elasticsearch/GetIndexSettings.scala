package controllers.elasticsearch

import elastic.ElasticClient

class GetIndexSettings extends ElasticsearchController {

  def index(indices: String) = processRequest(ElasticClient.getIndexSettings(indices, _))

}
