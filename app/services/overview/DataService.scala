package services.overview

import com.google.inject.Inject
import elastic.{ElasticClient, Error}
import models.ElasticServer
import play.api.libs.json.JsValue
import services.exception.RequestFailedException

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class DataService @Inject()(client: ElasticClient) {

  val NodesHeaders = Seq(
    "id",
    "ip",
    "version",
    "jdk",
    "disk.total",
    "disk.avail",
    "disk.used_percent",
    "heap.current",
    "heap.percent",
    "heap.max",
    "cpu",
    "load_1m",
    "node.role",
    "master",
    "name"
  )

  val apis = Seq(
    "_cluster/settings",
    "_cluster/health",
    s"_cat/nodes?h=${NodesHeaders.mkString(",")}&format=json",
    "_cat/indices?format=json",
    "_cat/shards?format=json&h=index,shard,prirep,node,state",
    "_cat/aliases?h=alias,index&format=json"
  )

  def getOverviewData(target: ElasticServer): Future[JsValue] = {
    Future.sequence(
      apis.map(client.executeRequest("GET", _, None, target))
    ).map { responses =>
      responses.zipWithIndex.find(_._1.isInstanceOf[Error]) match {
        case Some((response, idx)) =>
          throw RequestFailedException(apis(idx), response.status, response.body.toString)

        case None =>
          ClusterOverview(
            responses(0).body,
            responses(1).body,
            responses(2).body,
            responses(3).body,
            responses(4).body,
            responses(5).body
          )
      }
    }
  }

}
