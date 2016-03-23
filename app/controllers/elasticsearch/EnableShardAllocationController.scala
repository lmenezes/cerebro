package controllers.elasticsearch

import elastic.ElasticClient

class EnableShardAllocationController extends ElasticsearchController {

  def index() = processRequest(ElasticClient.enableShardAllocation(_))

}
