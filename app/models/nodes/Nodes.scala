package models.nodes

import play.api.libs.json.{JsArray, JsObject, JsValue}

object Nodes {

  def apply(info: JsValue, stats: JsValue, master: JsValue): JsValue = {
    val masterId = (master \\ "id").head.as[String]
    JsArray(
      (info \ "nodes").as[JsObject].keys.map { nodeId =>
        val nodeInfo = (info \ "nodes" \ nodeId).as[JsValue]
        val nodeStats = (stats \ "nodes" \ nodeId).as[JsValue]
        val currentMaster = masterId.equals(nodeId)
        Node(nodeId, currentMaster, nodeInfo, nodeStats).as[JsValue]
      }.toSeq
    )
  }

}
