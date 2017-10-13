package models.commons

import play.api.libs.json.{JsArray, JsString, JsValue}

case class NodeRoles(master: Boolean, data: Boolean, ingest: Boolean) {

  def coordinating: Boolean = !master && !data && !ingest

  def toEsString = {
    val builder = StringBuilder.newBuilder
    if (master)
      builder.append("m")
    if (data)
      builder.append("d")
    if (ingest)
      builder.append("i")
    if (builder.isEmpty)
      builder.append("-")
    builder.toString()
  }

}

object NodeRoles {

  private def truthy(value: String): Boolean = {
    value.equals("true") || value.equals("yes")
  }

  def apply(nodeInfo: JsValue): NodeRoles = {
    (nodeInfo \ "roles").asOpt[JsArray] match {
      case Some(JsArray(roles)) => // 5.X
        NodeRoles(
          roles.contains(JsString("master")),
          roles.contains(JsString("data")),
          roles.contains(JsString("ingest"))
        )

      case None => // 2.X
        val master = truthy((nodeInfo \ "attributes" \ "master").asOpt[String].getOrElse("true"))
        val data = truthy((nodeInfo \ "attributes" \ "data").asOpt[String].getOrElse("true"))
        val client = truthy((nodeInfo \ "attributes" \ "client").asOpt[String].getOrElse("false"))

        NodeRoles(
          master && !client,
          data && !client,
          false // 2.x doesnt support ingest
        )
    }
  }

  def apply(roles: String): NodeRoles =
    NodeRoles(roles.contains("m"), roles.contains("d"), roles.contains("i"))

}
