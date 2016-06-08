package controllers

import models.ElasticServer

class EnableShardAllocationController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.enableShardAllocation(ElasticServer(request.host, request.authentication))

}
