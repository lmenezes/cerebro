package controllers.elasticsearch

import elastic.ElasticClient

class DisableShardAllocationController extends ElasticsearchController {

  def index() = processRequest(ElasticClient.disableShardAllocation(_))

}
