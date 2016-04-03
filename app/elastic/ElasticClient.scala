package elastic

import play.api.Play.current
import play.api.libs.ws.WS
import play.api.mvc.Results.EmptyContent

import scala.concurrent.Future

trait ElasticClient {

  def main(host: String) =
    ElasticResponse(WS.url(s"$host").get())

  def clusterState(host: String) =
    ElasticResponse(WS.url(s"$host/_cluster/state/master_node,routing_table,routing_nodes,blocks").get())

  def indicesStats(host: String) =
    ElasticResponse(WS.url(s"$host/_stats/docs,store").get())

  def nodesStats(host: String) =
    ElasticResponse(WS.url(s"$host/_nodes/stats/jvm,fs,os,process").get())

  def nodesStats(node: String, host: String) =
    ElasticResponse(WS.url(s"$host/_nodes/$node/stats?human").get())

  def clusterSettings(host: String) =
    ElasticResponse(WS.url(s"$host/_cluster/settings").get())

  def aliases(host: String) =
    ElasticResponse(WS.url(s"$host/_aliases").get())

  def clusterHealth(host: String) =
    ElasticResponse(WS.url(s"$host/_cluster/health").get())

  def nodes(host: String) =
    ElasticResponse(WS.url(s"$host/_nodes/_all/os,jvm").get())

  def closeIndex(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_close").post(EmptyContent()))

  def openIndex(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_open").post(EmptyContent()))

  def refreshIndex(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_refresh").post(EmptyContent()))

  def optimizeIndex(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_optimize").post(EmptyContent()))

  def clearIndexCache(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_cache/clear").post(EmptyContent()))

  def deleteIndex(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index").delete())

  def getIndexSettings(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_settings").get())

  def getIndexMapping(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_mapping").get())

  def putClusterSettings(settings: String, host: String) =
    ElasticResponse(WS.url(s"$host/_cluster/settings").put(settings))

  private def allocationSettings(value: String) =
    s"""{"transient": {"cluster": {"routing": {"allocation": {"enable": \"$value\"}}}}}"""

  def enableShardAllocation(host: String) =
    putClusterSettings(allocationSettings("all"), host)

  def disableShardAllocation(host: String) =
    putClusterSettings(allocationSettings("none"), host)

  def getShardStats(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_stats?level=shards&human=true").get())

  def getIndexRecovery(index: String, host: String) =
    ElasticResponse(WS.url(s"$host/$index/_recovery?active_only=true&human=true").get())


}

object ElasticClient extends ElasticClient
