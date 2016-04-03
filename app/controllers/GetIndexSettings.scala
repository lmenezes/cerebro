package controllers

import elastic.ElasticClient.getIndexSettings

import scala.concurrent.ExecutionContext.Implicits.global

class GetIndexSettings extends BaseController {

  def processRequest = { request =>
    getIndexSettings(request.get("index"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
