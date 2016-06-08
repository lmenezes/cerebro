package controllers

import models.ElasticServer

class DisableShardAllocationController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.disableShardAllocation(ElasticServer(request.host, request.authentication))

}
