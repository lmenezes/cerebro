package elastic

import models.{ESAuth, ElasticServer}
import play.api.Play.current
import play.api.libs.ws.{WS, WSAuthScheme}

import scala.concurrent.ExecutionContext.Implicits.global

trait ElasticClient {

  def main(target: ElasticServer) =
    execute(s"${target.host}", "GET", None, target.authentication)

  def clusterState(target: ElasticServer) = {
    val path = "/_cluster/state/master_node,routing_table,routing_nodes,blocks"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def indicesStats(target: ElasticServer) = {
    val path = "/_stats/docs,store"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def nodesStats(target: ElasticServer) = {
    val path = "/_nodes/stats/jvm,fs,os,process"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def nodeStats(node: String, target: ElasticServer) = {
    val path = s"/_nodes/$node/stats?human"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def clusterSettings(target: ElasticServer) = {
    val path = "/_cluster/settings"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def aliases(target: ElasticServer) = {
    val path = "/_aliases"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def clusterHealth(target: ElasticServer) = {
    val path = "/_cluster/health"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def nodes(target: ElasticServer) = {
    val path = "/_nodes/_all/os,jvm"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def closeIndex(index: String, target: ElasticServer) = {
    val path = s"/$index/_close"
    execute(s"${target.host}$path", "POST", None, target.authentication)
  }

  def openIndex(index: String, target: ElasticServer) = {
    val path = s"/$index/_open"
    execute(s"${target.host}$path", "POST", None, target.authentication)
  }

  def refreshIndex(index: String, target: ElasticServer) = {
    val path = s"/$index/_refresh"
    execute(s"${target.host}$path", "POST", None, target.authentication)
  }


  def optimizeIndex(index: String, target: ElasticServer) = {
    val path = s"/$index/_optimize"
    execute(s"${target.host}$path", "POST", None, target.authentication)
  }

  def clearIndexCache(index: String, target: ElasticServer) = {
    val path = s"/$index/_cache/clear"
    execute(s"${target.host}$path", "POST", None, target.authentication)
  }

  def deleteIndex(index: String, target: ElasticServer) = {
    val path = s"/$index"
    execute(s"${target.host}$path", "DELETE", None, target.authentication)
  }

  def getIndexSettings(index: String, target: ElasticServer) = {
    val path = s"/$index/_settings"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def getIndexMapping(index: String, target: ElasticServer) = {
    val path = s"/$index/_mapping"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def putClusterSettings(settings: String, target: ElasticServer) = {
    val path = "/_cluster/settings"
    execute(s"${target.host}$path", "PUT", Some(settings), target.authentication)
  }

  private def allocationSettings(value: String) =
    s"""{"transient": {"cluster": {"routing": {"allocation": {"enable": \"$value\"}}}}}"""

  def enableShardAllocation(target: ElasticServer) =
    putClusterSettings(allocationSettings("all"), target)

  def disableShardAllocation(target: ElasticServer) =
    putClusterSettings(allocationSettings("none"), target)

  def getShardStats(index: String, target: ElasticServer) = {
    val path = s"/$index/_stats?level=shards&human=true"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def getIndexRecovery(index: String, target: ElasticServer) = {
    val path = s"/$index/_recovery?active_only=true&human=true"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def getClusterMapping(target: ElasticServer) = {
    val path = "/_mapping"
    execute(s"${target.host}$path", "GET", None, target.authentication)
  }

  def executeRequest(method: String, path: String, data: Option[String], target: ElasticServer) =
    execute(s"${target.host}/$path", method, data, target.authentication)

  private def execute[T](url: String, method: String, body: Option[String] = None, authentication: Option[ESAuth] = None) = {
    val request = authentication.foldLeft(WS.url(url).withMethod(method)) {
      case (request, auth) => request.withAuth(auth.username, auth.password, WSAuthScheme.BASIC)
    }
    body.fold(request)(request.withBody((_))).execute.map { response =>
      ElasticResponse(response.status, response.json)
    }
  }

}

object ElasticClient extends ElasticClient
