package controllers

import elastic.ElasticClient.putClusterSettings

import scala.concurrent.ExecutionContext.Implicits.global

class PutClusterSettings extends BaseController {

  def processRequest = { request =>
    putClusterSettings(request.get("settings"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
