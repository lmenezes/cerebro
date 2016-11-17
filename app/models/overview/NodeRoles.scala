package models.overview

import play.api.libs.json.{JsArray, JsString, JsValue}

case class NodeRoles(master: Boolean, data: Boolean, ingest: Boolean) {

  def client: Boolean = !master && !data && !ingest

}

object NodeRoles {

  def apply(nodeInfo: JsValue): NodeRoles = {
    (nodeInfo \ "roles").asOpt[JsArray] match {
      case Some(JsArray(roles)) => // 5.X
        NodeRoles(
          roles.contains(JsString("master")),
          roles.contains(JsString("data")),
          roles.contains(JsString("ingest"))
        )

      case None => // 2.X
        val master = (nodeInfo \ "attributes" \ "master").asOpt[String].getOrElse("true").equals("true")
        val data = (nodeInfo \ "attributes" \ "data").asOpt[String].getOrElse("true").equals("true")
        val client = (nodeInfo \ "attributes" \ "client").asOpt[String].getOrElse("false").equals("true")

        NodeRoles(
          master && !client,
          data && !client,
          false // 2.x doesnt support ingest
        )
    }
  }
}
