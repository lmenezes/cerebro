package models.commons

import play.api.libs.json.{JsArray, JsString, JsValue}

case class NodeRoles(master: Boolean, data: Boolean, ingest: Boolean) {

  def coordinating: Boolean = !master && !data && !ingest

}

object NodeRoles {

  private def truthy(value: String): Boolean = {
    value.equals("true") || value.equals("yes")
  }

  def apply(nodeInfo: JsValue): NodeRoles = {
    // >= 7.10
    val dataRoles = Seq("data", "data_content", "data_hot", "data_warm", "data_cold").map(JsString)

    (nodeInfo \ "roles").asOpt[JsArray] match {
      case Some(JsArray(roles)) => // >= 5.X
        NodeRoles(
          roles.contains(JsString("master")),
          roles.exists(role => dataRoles.contains(role)),
          roles.contains(JsString("ingest"))
        )

      case None => // 2.X
        val master = truthy((nodeInfo \ "attributes" \ "master").asOpt[String].getOrElse("true"))
        val data = truthy((nodeInfo \ "attributes" \ "data").asOpt[String].getOrElse("true"))
        val client = truthy((nodeInfo \ "attributes" \ "client").asOpt[String].getOrElse("false"))

        NodeRoles(
          master = master && !client,
          data = data && !client,
          ingest = false // 2.x doesnt support ingest
        )
    }
  }
}
