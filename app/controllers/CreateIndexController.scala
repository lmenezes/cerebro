package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{ElasticServer, IndexMetadata}
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext.Implicits.global

class CreateIndexController @Inject()(val authentication: AuthenticationModule,
                                      client: ElasticClient) extends BaseController {

  def execute = process { request =>
    client.createIndex(
      request.get("index"), request.getObjOpt("metadata").getOrElse(Json.obj()),
      ElasticServer(request.host, request.authentication)
    ).map { response =>
      Status(response.status)(response.body)
    }
  }

  def getIndexMetadata = process { request =>
    client.getIndexMetadata(request.get("index"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(IndexMetadata(response.body))
    }
  }

}
