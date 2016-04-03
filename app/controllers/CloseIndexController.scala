package controllers

import elastic.ElasticClient.closeIndex

import scala.concurrent.ExecutionContext.Implicits.global

class CloseIndexController extends BaseController {

  def processRequest = { request =>
    closeIndex(request.get("indices"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
