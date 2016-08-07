package controllers

import models.{ElasticServer, IndexMetadata}
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext.Implicits.global

class CreateIndexController extends BaseController {

  def execute = process { (request, client) =>
    client.createIndex(
      request.get("index"), request.getOpt("metadata").getOrElse(Json.obj()),
      ElasticServer(request.host, request.authentication)
    ).map { response =>
      Status(response.status)(response.body)
    }
  }

  def getIndexMetadata = process { (request, client) =>
    client.getIndexMetadata(request.get("index"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(IndexMetadata(response.body))
    }
  }

}
