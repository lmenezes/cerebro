package controllers

import elastic.ElasticClient.openIndex

import scala.concurrent.ExecutionContext.Implicits.global

class OpenIndexController extends BaseController {

  def processRequest = { request =>
    openIndex(request.get("indices"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
