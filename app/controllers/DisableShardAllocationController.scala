package controllers

import elastic.ElasticClient.disableShardAllocation

import scala.concurrent.ExecutionContext.Implicits.global

class DisableShardAllocationController extends BaseController {

  def processRequest = { request =>
    disableShardAllocation(request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
