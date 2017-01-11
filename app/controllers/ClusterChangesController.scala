package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.ElasticServer
import models.commons.{Indices, Nodes}
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterChangesController @Inject()(val authentication: AuthenticationModule,
                                         client: ElasticClient) extends BaseController {

  def get = process { request =>
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
