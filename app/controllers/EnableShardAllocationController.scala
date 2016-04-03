package controllers

class EnableShardAllocationController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.enableShardAllocation(request.host)

}
