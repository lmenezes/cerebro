package services.overview

import play.api.libs.json._

object Index {

  def apply(data: JsValue, shardsData: Seq[JsValue], aliases: Seq[JsString]): JsValue = {

    val special = (data \ "index").as[String].startsWith(".")

    val shards = shardsData.map {
      case shard =>
        val node = (shard \ "node").asOpt[String].getOrElse("unassigned")
        node -> Json.obj(
        "shard" -> (shard \ "shard").as[JsValue],
        "primary" -> (shard \ "prirep").asOpt[String].contains("p"),
        "index" -> (shard \ "index").as[JsValue],
        "state" -> (shard \ "state").as[JsValue]
      )
    }.groupBy(_._1).mapValues(v => JsArray(v.map(_._2)))

    JsObject(Seq(
      "name"                -> (data \ "index").as[JsValue],
      "closed"              -> JsBoolean((data \ "status").as[String].equals("close")),
      "special"             -> JsBoolean(special),
      "unhealthy"           -> JsBoolean(unhealthyIndex(shards)),
      "doc_count"           -> (data \ "docs.count").as[JsValue],
      "deleted_docs"        -> (data \ "docs.deleted").as[JsValue],
      "size_in_bytes"       -> (data \ "pri.store.size").as[JsValue],
      "total_size_in_bytes" -> (data \ "store.size").as[JsValue],
      "aliases"             -> JsArray(aliases),
      "num_shards"          -> (data \ "pri").as[JsValue],
      "num_replicas"        -> (data \ "rep").as[JsValue],
      "shards"              -> JsObject(shards)
    ))
  }

  private def unhealthyIndex(shards: Map[String, JsArray]): Boolean =
    shards.exists {
      case ("unassigned", _)    => true
      case (_, JsArray(s)) => s.exists(!_.\("state").as[String].equals("STARTED"))
    }

}
