package controllers

import elastic.ElasticClient._
import models.overview.ClusterOverview

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterOverviewController extends BaseController {

  def processRequest = {
    request => {
      Future.sequence(
        Seq(
          clusterState(request.host),
          nodesStats(request.host),
          indicesStats(request.host),
          clusterSettings(request.host),
          aliases(request.host),
          clusterHealth(request.host),
          nodes(request.host),
          main(request.host)
        )
      ).map { f =>
        new ClusterOverview(f(0).body, f(1).body, f(2).body, f(3).body, f(4).body, f(5).body, f(6).body, f(7).body).json
      }.map(Ok(_))
    }

  }

}
