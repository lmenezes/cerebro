package controllers

import models.ElasticServer
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext.Implicits.global

class CreateIndexController extends BaseController {

  def processRequest = (request, client) => {
    client.createIndex(request.get("index"), request.getOpt("metadata").getOrElse(Json.obj()), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
