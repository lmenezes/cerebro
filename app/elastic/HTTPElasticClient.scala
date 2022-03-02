package elastic

import java.net.URLEncoder
import javax.inject.Singleton

import com.google.inject.Inject
import elastic.HTTPElasticClient._
import models.ElasticServer
import play.api.libs.json._
import play.api.libs.ws.{WSAuthScheme, WSClient}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class HTTPElasticClient @Inject()(client: WSClient) extends ElasticClient {

  def main(target: ElasticServer) =
    execute(s"", "GET", None, target)

  def clusterState(target: ElasticServer) = {
    val path = "/_cluster/state/master_node,routing_table,routing_nodes,blocks"
    execute(path, "GET", None, target)
  }

  def indicesStats(target: ElasticServer) = {
    val path = "/_stats/docs,store"
    execute(path, "GET", None, target)
  }

  def nodesStats(stats: Seq[String], target: ElasticServer) = {
    val path = s"/_nodes/stats/${stats.mkString(",")}?human=true"
    execute(path, "GET", None, target)
  }

  def indexStats(index: String, target: ElasticServer): Future[ElasticResponse] = {
    val path = s"/${encoded(index)}/_stats?human=true"
    execute(path, "GET", None, target)
  }

  def nodeStats(node: String, target: ElasticServer) = {
    val path = s"/_nodes/${encoded(node)}/stats?human"
    execute(path, "GET", None, target)
  }

  def clusterSettings(target: ElasticServer) = {
    val path = "/_cluster/settings"
    execute(path, "GET", None, target)
  }

  def aliases(target: ElasticServer) = {
    val path = "/_aliases"
    execute(path, "GET", None, target)
  }

  def clusterHealth(target: ElasticServer) = {
    val path = "/_cluster/health"
    execute(path, "GET", None, target)
  }

  def nodes(flags: Seq[String], target: ElasticServer) = {
    val path = s"/_nodes/_all/${flags.mkString(",")}?human=true"
    execute(path, "GET", None, target)
  }

  def closeIndex(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_close"
    execute(path, "POST", None, target, Seq(JsonContentType))
  }

  def openIndex(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_open"
    execute(path, "POST", None, target, Seq(JsonContentType))
  }

  def refreshIndex(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_refresh"
    execute(path, "POST", None, target, Seq(JsonContentType))
  }

  def flushIndex(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_flush"
    execute(path, "POST", None, target, Seq(JsonContentType))
  }

  def forceMerge(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_forcemerge"
    execute(path, "POST", None, target, Seq(JsonContentType))
  }

  def clearIndexCache(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_cache/clear"
    execute(path, "POST", None, target, Seq(JsonContentType))
  }

  def deleteIndex(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}"
    execute(path, "DELETE", None, target)
  }

  def getIndexSettings(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_settings"
    execute(path, "GET", None, target)
  }

  def getIndexSettingsFlat(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_settings?flat_settings=true&include_defaults=true"
    execute(path, "GET", None, target)
  }

  def getIndexMapping(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_mapping"
    execute(path, "GET", None, target)
  }

  def putClusterSettings(settings: String, target: ElasticServer) = {
    val path = "/_cluster/settings"
    execute(path, "PUT", Some(settings), target, Seq(JsonContentType))
  }

  private def allocationSettings(value: String) =
    s"""{"transient": {"cluster": {"routing": {"allocation": {"enable": \"$value\"}}}}}"""

  def enableShardAllocation(target: ElasticServer) =
    putClusterSettings(allocationSettings("all"), target)

  def disableShardAllocation(target: ElasticServer, kind: String) =
    putClusterSettings(allocationSettings(kind), target)

  def getShardStats(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_stats?level=shards&human=true"
    execute(path, "GET", None, target)
  }

  def relocateShard(shard: Int, index: String, from: String, to: String, target: ElasticServer) = {
    val path = "/_cluster/reroute"
    val commands =
      s"""
         |{
         |  "commands": [
         |    {
         |      "move": {
         |        "shard": $shard,
         |        "index": \"$index\",
         |        "from_node": \"$from\",
         |        "to_node": \"$to\"
         |      }
         |    }
         |  ]
         |}
       """.stripMargin
    execute(path, "POST", Some(commands), target, Seq(JsonContentType))
  }

  def getIndexRecovery(index: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_recovery?active_only=true&human=true"
    execute(path, "GET", None, target)
  }

  def getClusterMapping(target: ElasticServer) = {
    val path = "/_mapping"
    execute(path, "GET", None, target)
  }

  def getAliases(target: ElasticServer) = {
    val path = "/_aliases"
    execute(path, "GET", None, target)
  }

  def updateAliases(changes: Seq[JsValue], target: ElasticServer) = {
    val path = "/_aliases"
    val body = Json.obj("actions" -> JsArray(changes))
    execute(path, "POST", Some(body.toString), target, Seq(JsonContentType))
  }

  def getIndexMetadata(index: String, target: ElasticServer) = {
    val path = s"/_cluster/state/metadata/${encoded(index)}?human=true"
    execute(path, "GET", None, target)
  }

  def createIndex(index: String, metadata: JsValue, target: ElasticServer) = {
    val path = s"/${encoded(index)}"
    execute(path, "PUT", Some(metadata.toString), target, Seq(JsonContentType))
  }

  def getIndices(target: ElasticServer) = {
    val path = s"/_cat/indices?format=json"
    execute(path, "GET", None, target)
  }

  def getTemplates(target: ElasticServer) = {
    val path = s"/_template"
    execute(path, "GET", None, target)
  }

  def createTemplate(name: String, template: JsValue, target: ElasticServer) = {
    val path = s"/_template/${encoded(name)}"
    execute(path, "PUT", Some(template.toString), target, Seq(JsonContentType))
  }

  def deleteTemplate(name: String, target: ElasticServer) = {
    val path = s"/_template/${encoded(name)}"
    execute(path, "DELETE", None, target)
  }

  def getNodes(target: ElasticServer) = {
    val path = s"/_cat/nodes?format=json"
    execute(path, "GET", None, target)
  }

  def analyzeTextByField(index: String, field: String, text: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_analyze"
    val body = Json.obj("text" -> text, "field" -> field).toString()
    execute(path, "GET", Some(body), target, Seq(JsonContentType))
  }

  def analyzeTextByAnalyzer(index: String, analyzer: String, text: String, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_analyze"
    val body = Json.obj("text" -> text, "analyzer" -> analyzer).toString()
    execute(path, "GET", Some(body), target, Seq(JsonContentType))
  }

  def getClusterSettings(target: ElasticServer) = {
    val path = s"/_cluster/settings?flat_settings=true&include_defaults=true"
    execute(path, "GET", None, target)
  }


  // Repositories
  def getRepositories(target: ElasticServer) = {
    val path = s"/_snapshot"
    execute(path, "GET", None, target)
  }

  def createRepository(name: String, repoType: String, settings: JsValue, target: ElasticServer) = {
    val path = s"/_snapshot/${encoded(name)}"
    val data = Json.obj("type" -> JsString(repoType), "settings" -> settings).toString
    execute(path, "PUT", Some(data), target, Seq(JsonContentType))
  }

  def deleteRepository(name: String, target: ElasticServer) = {
    val path = s"/_snapshot/${encoded(name)}"
    execute(path, "DELETE", None, target)
  }

  // Snapshots
  def getSnapshots(repository: String, target: ElasticServer) = {
    val path = s"/_snapshot/${encoded(repository)}/_all"
    execute(path, "GET", None, target)
  }

  def deleteSnapshot(repository: String, snapshot: String, target: ElasticServer) = {
    val path = s"/_snapshot/${encoded(repository)}/${encoded(snapshot)}"
    execute(path, "DELETE", None, target)
  }

  def createSnapshot(repository: String, snapshot: String, ignoreUnavailable: Boolean,
                     includeGlobalState: Boolean, indices: Option[String], target: ElasticServer) = {
    val path = s"/_snapshot/${encoded(repository)}/${encoded(snapshot)}"
    val data = JsObject(
      Seq(
        ("repository", JsString(repository)),
        ("snapshot", JsString(snapshot)),
        ("ignoreUnavailable", JsBoolean(ignoreUnavailable)),
        ("includeGlobalState", JsBoolean(includeGlobalState))
      ) ++ indices.map { i => Seq(("indices", JsString(i))) }.getOrElse(Nil)
    ).toString
    execute(path, "PUT", Some(data), target, Seq(JsonContentType))
  }

  def restoreSnapshot(repository: String, snapshot: String, renamePattern: Option[String],
                      renameReplacement: Option[String], ignoreUnavailable: Boolean, includeAliases: Boolean,
                      includeGlobalState: Boolean, indices: Option[String], target: ElasticServer) = {
    val path = s"/_snapshot/${encoded(repository)}/${encoded(snapshot)}/_restore"
    val data = JsObject(
      Seq(
        ("ignore_unavailable", JsBoolean(ignoreUnavailable)),
        ("include_global_state", JsBoolean(includeGlobalState)),
        ("include_aliases", JsBoolean(includeAliases))
      ) ++
        indices.map { i => Seq(("indices", JsString(i))) }.getOrElse(Nil) ++
        renamePattern.map { r => Seq(("rename_pattern", JsString(r))) }.getOrElse(Nil) ++
        renameReplacement.map { r => Seq(("rename_replacement", JsString(r))) }.getOrElse(Nil)
    ).toString
    execute(path, "POST", Some(data), target, Seq(JsonContentType))
  }

  def saveClusterSettings(settings: JsValue, target: ElasticServer) = {
    val path = s"/_cluster/settings"
    execute(path, "PUT", Some(settings.toString), target, Seq(JsonContentType))
  }

  def updateIndexSettings(index: String, settings: JsValue, target: ElasticServer) = {
    val path = s"/${encoded(index)}/_settings"
    execute(path, "PUT", Some(settings.toString), target, Seq(JsonContentType))
  }

  // Cat requests
  def catRequest(api: String, target: ElasticServer) = {
    val path = s"/_cat/$api"
    execute(s"$path?format=json", "GET", None, target)
  }

  def executeRequest(method: String, path: String, data: Option[JsValue], target: ElasticServer) = {
    val headers = data.map {
      case _: JsString => NdJsonContentType // if it's not a json, it is assumed that bulk or multi-search API is used
      case _ => JsonContentType
    }.toSeq
    
    val body = data.map {
      case JsString(value) => value // needed to handle non valid json requests(multisearch, bulk...)
      case v: JsValue => v.toString
    }
    execute(s"/${path}", method, body, target, headers)
  }

  protected def execute[T](uri: String,
                           method: String,
                           body: Option[String] = None,
                           target: ElasticServer,
                           headers: Seq[(String, String)] = Seq()) = {
    val authentication = target.host.authentication
    val url = s"${target.host.name.replaceAll("/+$", "")}$uri"

    val mergedHeaders = headers ++ target.headers

    val request =
      authentication.foldLeft(client.url(url).withMethod(method).withHttpHeaders(mergedHeaders: _*)) {
      case (request, auth) =>
        request.withAuth(auth.username, auth.password, WSAuthScheme.BASIC)
    }

    body.fold(request)(request.withBody((_))).execute().map { response =>
      ElasticResponse(response)
    }
  }

  // FIXME: ES > 5.X does not support indices with special characters, so this could be removed
  private def encoded(text: String): String = URLEncoder.encode(text, "UTF-8")

  override def catMaster(target: ElasticServer): Future[ElasticResponse] = {
    val path = "/_cat/master"
    execute(s"$path?format=json", "GET", None, target)
  }
}

object HTTPElasticClient {
  val JsonContentType: (String, String) = ("Content-type", "application/json")

  val NdJsonContentType: (String, String) = ("Content-type", "application/x-ndjson")
}
