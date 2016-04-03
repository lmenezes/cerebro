package controllers

import elastic.ElasticClient.deleteIndex

import scala.concurrent.ExecutionContext.Implicits.global

class DeleteIndexController extends BaseController {

  def processRequest = { request =>
    deleteIndex(request.get("indices"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
