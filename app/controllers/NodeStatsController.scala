package controllers

import elastic.ElasticClient.nodesStats

import scala.concurrent.ExecutionContext.Implicits.global

class NodeStatsController extends BaseController {

  def processRequest = { request =>
    nodesStats(request.get("node"), request.host).map {
      response => Status(response.status)(response.body)
    }
  }

}
