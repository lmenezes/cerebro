package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error}
import models.commons.{Indices, Nodes}
import models.{CerebroResponse, Hosts}
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterChangesController @Inject()(val authentication: AuthenticationModule,
                                         val hosts: Hosts,
                                         client: ElasticClient) extends BaseController {

  def get = process { request =>
    Future.sequence(Seq(
      client.getIndices(request.target),
      client.getNodes(request.target),
      client.main(request.target)
    )).map { responses =>
      val failed = responses.find(_.isInstanceOf[Error])
      failed match {
        case None =>
          val body = Json.obj(
            "indices" -> Indices(responses(0).body),
            "nodes" -> Nodes(responses(1).body),
            "cluster_name" -> (responses(2).body \ "cluster_name").as[String]
          )
          CerebroResponse(200, body)
        case Some(f) =>
          CerebroResponse(f.status, f.body)
      }
    }
  }
}
