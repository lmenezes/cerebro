package controllers

import elastic.ElasticClient.clearIndexCache

import scala.concurrent.ExecutionContext.Implicits.global

class ClearIndexCacheController extends BaseController {

  def processRequest = { request =>
    clearIndexCache(request.get("indices"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
