package elastic

import com.google.inject.ImplementedBy
import models.ElasticServer
import play.api.libs.json._

import scala.concurrent.Future

@ImplementedBy(classOf[HTTPElasticClient])
trait ElasticClient {

  def main(target: ElasticServer): Future[ElasticResponse]

  def clusterState(target: ElasticServer): Future[ElasticResponse]

  def indicesStats(target: ElasticServer): Future[ElasticResponse]

  def nodesStats(stats: Seq[String], target: ElasticServer): Future[ElasticResponse]

  def nodeStats(node: String, target: ElasticServer): Future[ElasticResponse]

  def indexStats(index: String, target: ElasticServer): Future[ElasticResponse]

  def clusterSettings(target: ElasticServer): Future[ElasticResponse]

  def aliases(target: ElasticServer): Future[ElasticResponse]

  def clusterHealth(target: ElasticServer): Future[ElasticResponse]

  def nodes(flags: Seq[String], target: ElasticServer): Future[ElasticResponse]

  def closeIndex(index: String, target: ElasticServer): Future[ElasticResponse]

  def openIndex(index: String, target: ElasticServer): Future[ElasticResponse]

  def refreshIndex(index: String, target: ElasticServer): Future[ElasticResponse]

  def flushIndex(index: String, target: ElasticServer): Future[ElasticResponse]

  def forceMerge(index: String, target: ElasticServer): Future[ElasticResponse]

  def clearIndexCache(index: String, target: ElasticServer): Future[ElasticResponse]

  def deleteIndex(index: String, target: ElasticServer): Future[ElasticResponse]

  def getIndexSettings(index: String, target: ElasticServer): Future[ElasticResponse]

  def getIndexSettingsFlat(index: String, target: ElasticServer): Future[ElasticResponse]

  def getIndexMapping(index: String, target: ElasticServer): Future[ElasticResponse]

  def putClusterSettings(settings: String, target: ElasticServer): Future[ElasticResponse]

  private def allocationSettings(value: String) =
    s"""{"transient": {"cluster": {"routing": {"allocation": {"enable": \"$value\"}}}}}"""

  def enableShardAllocation(target: ElasticServer): Future[ElasticResponse]

  def disableShardAllocation(target: ElasticServer, kind: String): Future[ElasticResponse]

  def getShardStats(index: String, target: ElasticServer): Future[ElasticResponse]

  def relocateShard(shard: Int, index: String, from: String, to: String, target: ElasticServer): Future[ElasticResponse]

  def getIndexRecovery(index: String, target: ElasticServer): Future[ElasticResponse]

  def getClusterMapping(target: ElasticServer): Future[ElasticResponse]

  def getAliases(target: ElasticServer): Future[ElasticResponse]

  def updateAliases(changes: Seq[JsValue], target: ElasticServer): Future[ElasticResponse]

  def getIndexMetadata(index: String, target: ElasticServer): Future[ElasticResponse]

  def createIndex(index: String, metadata: JsValue, target: ElasticServer): Future[ElasticResponse]

  def getIndices(target: ElasticServer): Future[ElasticResponse]

  def getTemplates(target: ElasticServer): Future[ElasticResponse]

  def createTemplate(name: String, template: JsValue, target: ElasticServer): Future[ElasticResponse]

  def deleteTemplate(name: String, target: ElasticServer): Future[ElasticResponse]

  def getNodes(target: ElasticServer): Future[ElasticResponse]

  def analyzeTextByField(index: String, field: String, text: String, target: ElasticServer): Future[ElasticResponse]

  def analyzeTextByAnalyzer(index: String, analyzer: String, text: String, target: ElasticServer): Future[ElasticResponse]

  def getClusterSettings(target: ElasticServer): Future[ElasticResponse]

  // Repositories
  def getRepositories(target: ElasticServer): Future[ElasticResponse]

  def createRepository(name: String, repoType: String, settings: JsValue, target: ElasticServer): Future[ElasticResponse]

  def deleteRepository(name: String, target: ElasticServer): Future[ElasticResponse]

  // Snapshots
  def getSnapshots(repository: String, target: ElasticServer): Future[ElasticResponse]

  def deleteSnapshot(repository: String, snapshot: String, target: ElasticServer): Future[ElasticResponse]

  def createSnapshot(repository: String, snapshot: String, ignoreUnavailable: Boolean,
                     includeGlobalState: Boolean, indices: Option[String], target: ElasticServer): Future[ElasticResponse]

  def restoreSnapshot(repository: String, snapshot: String, renamePattern: Option[String],
                      renameReplacement: Option[String], ignoreUnavailable: Boolean, includeAliases: Boolean,
                      includeGlobalState: Boolean, indices: Option[String], target: ElasticServer): Future[ElasticResponse]

  def saveClusterSettings(settings: JsValue, target: ElasticServer): Future[ElasticResponse]

  def updateIndexSettings(index: String, settings: JsValue, target: ElasticServer): Future[ElasticResponse]

  // Cat requests
  def catRequest(api: String, target: ElasticServer): Future[ElasticResponse]

  // Cat master
  def catMaster(target: ElasticServer): Future[ElasticResponse]

  def executeRequest(method: String, path: String, data: Option[JsValue], target: ElasticServer): Future[ElasticResponse]

}
