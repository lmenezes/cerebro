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
      "_cluster/state/master_node,routing_table,routing_nodes,blocks",
      "_nodes/stats/jvm,fs,os,process?human=true",
      "_stats/docs,store",
      "_cluster/settings",
      "_aliases",
      "_cluster/health",
      s"_nodes/_all/os,jvm?human=true",
      ""
    )

    val start = System.currentTimeMillis()
    Future.sequence(apis.map(client.executeRequest("GET", _, None, target))).map { responses =>
      responses.zipWithIndex.find(_._1.isInstanceOf[Error]) match {
        case Some((failed, idx)) =>
          throw RequestFailedException(apis(idx), failed.status, failed.body.toString())

        case None =>
          val end = System.currentTimeMillis()
          val overview = ClusterOverview(
            responses(0).body,
            responses(1).body,
            responses(2).body,
            responses(3).body,
            responses(4).body,
            responses(5).body,
            responses(6).body,
            responses(7).body
          )
          println(s"Requesting took [${end - start}]")
          overview
      }
    }
  }

}
