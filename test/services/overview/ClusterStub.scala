package services.overview

import play.api.libs.json.JsValue

trait ClusterStub {

  def apply() = ClusterOverview(settings, health, nodes, indices, shards, aliases)

  val settings: JsValue

  val health: JsValue

  val nodes: JsValue

  val indices: JsValue

  val shards: JsValue

  val aliases: JsValue

}
