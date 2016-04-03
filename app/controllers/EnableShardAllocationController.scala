package controllers

import elastic.ElasticClient.enableShardAllocation

class EnableShardAllocationController extends ElasticActionController {

  def processElasticRequest = request => enableShardAllocation(request.host)

}
