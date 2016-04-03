package controllers

import elastic.ElasticClient.refreshIndex

import scala.concurrent.ExecutionContext.Implicits.global

class RefreshIndexController extends BaseController {

  def processRequest = { request =>
    refreshIndex(request.get("indices"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
