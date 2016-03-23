package controllers

import elastic.ElasticClient._
import models.overview.ClusterOverview
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future


object ClusterOverviewController extends Controller {

  def index = Action.async {
    request => {
      val host = request.queryString.getOrElse("host", Seq("http://localhost:9200")).head
      try {
        val response = Future.sequence(
          Seq(clusterState(host), nodesStats(host), indicesStats(host), clusterSettings(host), aliases(host), clusterHealth(host), nodes(host), main(host))
        ).map { f =>
          new ClusterOverview(f(0).body, f(1).body, f(2).body, f(3).body, f(4).body, f(5).body, f(6).body, f(7).body).json
        }.recover {
          case e =>
            throw e
        }
        response.map(Ok(_))
      } catch {
        case _ => Future.successful(Status(500)(s"Cannot connect to $host"))
      }
    }

  }

}
