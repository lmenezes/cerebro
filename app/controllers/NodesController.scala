package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error}
import models.nodes.Nodes
import models.{CerebroResponse, Hosts}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class NodesController @Inject()(val authentication: AuthenticationModule,
                                val hosts: Hosts,
                                client: ElasticClient) extends BaseController {

  def index = process { request =>
    Future.sequence(
      Seq(
        client.nodes(Seq("jvm", "os"), request.target),
        client.nodesStats(Seq("jvm", "fs", "os", "process"), request.target),
        client.catMaster(request.target)
      )
    ).map { responses =>
      val failed = responses.find(_.isInstanceOf[Error])
      failed match {
        case Some(f) => CerebroResponse(f.status, f.body)
        case None =>
          val nodes = Nodes(responses(0).body, responses(1).body, responses(2).body)
          CerebroResponse(200, nodes)
      }
    }
  }

}
