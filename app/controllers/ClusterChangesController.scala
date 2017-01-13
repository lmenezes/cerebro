package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroResponse, ElasticServer}
import models.commons.{Indices, Nodes}
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterChangesController @Inject()(val authentication: AuthenticationModule,
                                         client: ElasticClient) extends BaseController {

  def get = process { request =>
    Future.sequence(Seq(
      client.getIndices(request.target),
      client.getNodes(request.target),
      client.main(request.target)
    )).map { responses =>
      Json.obj(
        "indices" -> Indices(responses(0).body),
        "nodes" -> Nodes(responses(1).body),
        "cluster_name" -> (responses(2).body \ "cluster_name").as[String]
      )
    }.map(CerebroResponse(200, _))
  }
}
