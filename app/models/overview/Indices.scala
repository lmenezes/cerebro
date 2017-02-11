package models.overview

import play.api.libs.json._

object Indices {

  def apply(clusterState: JsValue, indicesStats: JsValue, aliases: JsValue) = {
    val routingTable = (clusterState \ "routing_table" \ "indices").as[JsObject]
    val openIndices = routingTable.value.map { case (index, shards) =>
      val stats = (indicesStats \ "indices" \ index).asOpt[JsObject].getOrElse(Json.obj())
      val indexShards = (shards \ "shards").as[JsObject].values.flatMap { case shards =>
        shards.as[JsArray].value.map { instance =>
          (instance \ "node").asOpt[String].getOrElse("unassigned") -> instance
        }
      }.groupBy(_._1).mapValues { shards => JsArray(shards.map(_._2).toSeq) }.toSeq

      val numShards = (shards \ "shards").as[JsObject].keys.size
      val numReplicas = (shards \ "shards" \ "0").as[JsArray].value.size - 1

      val unhealthy = indexShards.find(_._1.equals("unassigned")).isDefined
      val special = index.startsWith(".")

      JsObject(Seq(
        "name"                -> JsString(index),
        "closed"              -> JsBoolean(false),
        "special"             -> JsBoolean(special),
        "unhealthy"           -> JsBoolean(unhealthy),
        "doc_count"           -> (stats \ "primaries" \ "docs" \ "count").asOpt[JsNumber].getOrElse(JsNumber(0)),
        "deleted_docs"        -> (stats \ "primaries" \ "docs" \ "deleted").asOpt[JsNumber].getOrElse(JsNumber(0)),
        "size_in_bytes"       -> (stats \ "primaries" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
        "total_size_in_bytes" -> (stats \ "total" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
        "aliases"             -> JsArray((aliases \ index \ "aliases").asOpt[JsObject].getOrElse(Json.obj()).keys.map(JsString(_)).toSeq), // 1.4 < does not return aliases obj
        "num_shards"          -> JsNumber(numShards),
        "num_replicas"        -> JsNumber(numReplicas),
        "shards"              -> JsObject(indexShards)
      ))
    }.toSeq

    openIndices ++ ClosedIndices(clusterState)
  }

}
