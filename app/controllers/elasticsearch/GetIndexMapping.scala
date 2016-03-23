package controllers.elasticsearch

import elastic.ElasticClient

class GetIndexMapping extends ElasticsearchController {

  def index(indices: String) = processRequest(ElasticClient.getIndexMapping(indices, _))

}
