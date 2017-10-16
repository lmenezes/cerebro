package models.overview

import play.api.libs.json._

object Index {

  def apply(name: String, stats: JsValue, routingTable: JsValue, aliases: JsObject): JsValue = {
    var unhealthy = false
    var numReplicas = 0
    var numShards = 0

    val shardMap = (routingTable \ "shards").as[JsObject].value.toSeq.flatMap { case (num, shards) =>
      numShards = Math.max(numShards, num.toInt + 1) // shard num is 0 based

      val shardInstances = shards.as[JsArray].value
      numReplicas = shardInstances.length - 1

      shardInstances.map { shard =>
        unhealthy = unhealthy && (shard \ "state").as[String].equals("STARTED")
        (shard \ "node").asOpt[String].getOrElse("unassigned") -> shard
      }
    }.groupBy(_._1).mapValues(v => JsArray(v.map(_._2)))

    val special = name.startsWith(".")

    JsObject(Seq(
      "name"                -> JsString(name),
      "closed"              -> JsBoolean(false),
      "special"             -> JsBoolean(special),
      "unhealthy"           -> JsBoolean(unhealthy),
      "doc_count"           -> (stats \ "primaries" \ "docs" \ "count").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "deleted_docs"        -> (stats \ "primaries" \ "docs" \ "deleted").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "size_in_bytes"       -> (stats \ "primaries" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "total_size_in_bytes" -> (stats \ "total" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "aliases"             -> JsArray(aliases.keys.map(JsString(_)).toSeq), // 1.4 < does not return aliases obj
      "num_shards"          -> JsNumber(numShards),
      "num_replicas"        -> JsNumber(numReplicas),
      "shards"              -> JsObject(shardMap)
    ))
  }

}
