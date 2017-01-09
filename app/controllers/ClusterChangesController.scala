package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.ElasticServer
import models.commons.{Indices, Nodes}
import play.api.libs.json.Json

import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

class ClusterChangesController @Inject()(val authentication: AuthenticationModule) extends BaseController {

  def get = process { (request, client) =>
    Future.sequence(Seq(
      client.getIndices(ElasticServer(request.host, request.authentication)),
      client.getNodes(ElasticServer(request.host, request.authentication)),
      client.main(ElasticServer(request.host, request.authentication))
    )).map { responses =>
      Json.obj(
        "indices" -> Indices(responses(0).body),
        "nodes" -> Nodes(responses(1).body),
        "cluster_name" -> (responses(2).body \ "cluster_name").as[String]
      )
    }.map(Ok(_))
  }
}
