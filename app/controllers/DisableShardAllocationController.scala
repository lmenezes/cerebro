package controllers

class DisableShardAllocationController extends ElasticActionController {

  def processElasticRequest = (request, client) => client.disableShardAllocation(request.host)

}
