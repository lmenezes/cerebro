package controllers

import models.ElasticServer
import models.overview.ClusterOverview

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterOverviewController extends BaseController {

  def execute = process { (request, client) =>
    Future.sequence(
      Seq(
        client.clusterState(ElasticServer(request.host, request.authentication)),
        client.nodesStats(ElasticServer(request.host, request.authentication)),
        client.indicesStats(ElasticServer(request.host, request.authentication)),
        client.clusterSettings(ElasticServer(request.host, request.authentication)),
        client.aliases(ElasticServer(request.host, request.authentication)),
        client.clusterHealth(ElasticServer(request.host, request.authentication)),
        client.nodes(ElasticServer(request.host, request.authentication)),
        client.main(ElasticServer(request.host, request.authentication))
      )
    ).map { f =>
      new ClusterOverview(f(0).body, f(1).body, f(2).body, f(3).body, f(4).body, f(5).body, f(6).body, f(7).body).json
    }.map(Ok(_))
  }

}
