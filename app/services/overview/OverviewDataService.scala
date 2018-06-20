package services.overview

import com.google.inject.Inject
import elastic.{ElasticClient, Error}
import models.ElasticServer
import models.overview.ClusterOverview
import play.api.libs.json.JsValue
import services.exception.RequestFailedException

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class OverviewDataService @Inject()(client: ElasticClient) {

  def overview(target: ElasticServer): Future[JsValue] = {
    val apis = Seq(
      "_cluster/state/master_node,routing_table,blocks",
      "_nodes/stats/jvm,fs,os,process?human=true",
      "_stats/docs,store?ignore_unavailable=true",
      "_cluster/settings",
      "_aliases",
      "_cluster/health",
      s"_nodes/_all/os,jvm?human=true"
    )
    Future.sequence(apis.map(client.executeRequest("GET", _, None, target))).map { responses =>
      responses.zipWithIndex.find(_._1.isInstanceOf[Error]) match {
        case Some((response, idx)) =>
          throw RequestFailedException(apis(idx), response.status, response.body.toString())

        case None =>
          ClusterOverview(
            responses(0).body, // cluster state
            responses(1).body, // nodes stats
            responses(2).body, // index stats
            responses(3).body, // cluster settings
            responses(4).body, // aliases
            responses(5).body, // cluster health
            responses(6).body  // nodes
          )
      }
    }
  }

}
