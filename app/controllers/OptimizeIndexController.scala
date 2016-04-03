package controllers

import elastic.ElasticClient.optimizeIndex

import scala.concurrent.ExecutionContext.Implicits.global

class OptimizeIndexController extends BaseController {

  def processRequest = { request =>
    optimizeIndex(request.get("indices"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
