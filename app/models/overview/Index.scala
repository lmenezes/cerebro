package models.overview

import play.api.libs.json._

object Index {

  def apply(name: String, stats: JsValue, shards: JsValue, aliases: JsObject, routingNodes: JsValue): JsValue = {

    val unassignedShards = (shards \ "shards").as[JsObject].values.flatMap {
      case JsArray(shards) =>
        shards.filter { shard =>
          (shard \ "node").asOpt[String].isEmpty
        }
      case _ => Nil
    }

    val shardsAllocation = routingNodes.as[JsObject].value.mapValues {
      case JsArray(shards) => JsArray(shards.filter { shard => (shard \ "index").as[String].equals(name) })
      case _ => JsArray()
    }.toSeq ++ Seq("unassigned" -> JsArray(unassignedShards.toSeq))

    val numShards = (shards \ "shards").as[JsObject].keys.size
    val numReplicas = (shards \ "shards" \ "0").as[JsArray].value.size - 1

    val special = name.startsWith(".")

    JsObject(Seq(
      "name"                -> JsString(name),
      "closed"              -> JsBoolean(false),
      "special"             -> JsBoolean(special),
      "unhealthy"           -> JsBoolean(unhealthyIndex(shardsAllocation)),
      "doc_count"           -> (stats \ "primaries" \ "docs" \ "count").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "deleted_docs"        -> (stats \ "primaries" \ "docs" \ "deleted").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "size_in_bytes"       -> (stats \ "primaries" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "total_size_in_bytes" -> (stats \ "total" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "aliases"             -> JsArray(aliases.keys.map(JsString(_)).toSeq), // 1.4 < does not return aliases obj
      "num_shards"          -> JsNumber(numShards),
      "num_replicas"        -> JsNumber(numReplicas),
      "shards"              -> JsObject(shardsAllocation)
    ))
  }

  private def unhealthyIndex(shardAllocation: Seq[(String, JsArray)]): Boolean =
    shardAllocation.exists {
      case ("unassigned", _)    => true
      case (_, JsArray(shards)) => shards.exists(!_.\("state").as[String].equals("STARTED"))
    }

}
