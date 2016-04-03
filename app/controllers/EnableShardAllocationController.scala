package controllers

import elastic.ElasticClient.enableShardAllocation

import scala.concurrent.ExecutionContext.Implicits.global

class EnableShardAllocationController extends BaseController {

  def processRequest = { request =>
    enableShardAllocation(request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
