package controllers

import elastic.ElasticClient.getIndexMapping

import scala.concurrent.ExecutionContext.Implicits.global

class GetIndexMapping extends BaseController {

  def processRequest = { request =>
    getIndexMapping(request.get("index"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
