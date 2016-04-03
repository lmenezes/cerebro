package controllers

import elastic.ElasticClient.disableShardAllocation

class DisableShardAllocationController extends ElasticActionController {

  def processElasticRequest = request => disableShardAllocation(request.host)

}
