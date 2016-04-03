package controllers

import models.overview.ClusterOverview

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterOverviewController extends BaseController {

  def processRequest = {
    (request, client) => {
      Future.sequence(
        Seq(
          client.clusterState(request.host),
          client.nodesStats(request.host),
          client.indicesStats(request.host),
          client.clusterSettings(request.host),
          client.aliases(request.host),
          client.clusterHealth(request.host),
          client.nodes(request.host),
          client.main(request.host)
        )
      ).map { f =>
        new ClusterOverview(f(0).body, f(1).body, f(2).body, f(3).body, f(4).body, f(5).body, f(6).body, f(7).body).json
      }.map(Ok(_))
    }

  }

}
