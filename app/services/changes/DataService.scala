package services.changes

import com.google.inject.Inject
import elastic.{ElasticClient, Error}
import models.ElasticServer
import models.commons.{Indices, Nodes}
import play.api.libs.json.{JsValue, Json}
import services.exception.RequestFailedException

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class DataService @Inject()(client: ElasticClient) {

  val apis = Seq(
    "_cat/nodes?format=json&h=name", // Node names
    "_cat/indices?format=json&h=index", // Index names
    "_cat/health?h=cluster&format=json" // Cluster name
  )

  def getData(target: ElasticServer): Future[JsValue] =
    Future.sequence(apis.map(client.executeRequest("GET", _, None, target))).map { responses =>
      responses.zipWithIndex.find(_._1.isInstanceOf[Error]) match {
        case Some((response, idx)) =>
          throw RequestFailedException(apis(idx), response.status, response.body.toString())

        case None =>
          Json.obj(
          "nodes" -> Nodes(responses(0).body),
          "indices" -> Indices(responses(1).body),
          "cluster_name" -> (responses(2).body \\ "cluster").head
        )
      }
    }

}
