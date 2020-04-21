package models.overview

import play.api.libs.json.JsValue

trait ClusterStub {

  def apply() = ClusterOverview(clusterState, nodesStats, indicesStats, clusterSettings, aliases, clusterHealth, nodes, indexingComplete)

  val clusterState: JsValue

  val nodesStats: JsValue

  val indicesStats: JsValue

  val clusterSettings: JsValue

  val aliases: JsValue

  val clusterHealth: JsValue

  val nodes: JsValue

  val indexingComplete: JsValue
}
