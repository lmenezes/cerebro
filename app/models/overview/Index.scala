package models.overview

import play.api.libs.json._

object Index {

  def apply(name: String, stats: JsValue, routingTable: JsValue, aliases: JsValue, indexBlock: JsObject): JsValue = {
    val shardMap = createShardMap(routingTable)

    JsObject(Seq(
      "name" -> JsString(name),
      "closed" -> isClosed(indexBlock),
      "special" -> JsBoolean(name.startsWith(".")),
      "unhealthy" -> JsBoolean(isIndexUnhealthy(shardMap)),
      "doc_count" -> (stats \ "primaries" \ "docs" \ "count").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "deleted_docs" -> (stats \ "primaries" \ "docs" \ "deleted").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "size_in_bytes" -> (stats \ "primaries" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "total_size_in_bytes" -> (stats \ "total" \ "store" \ "size_in_bytes").asOpt[JsNumber].getOrElse(JsNumber(0)),
      "aliases" -> JsArray(aliases.as[JsObject].keys.map(JsString(_)).toSeq), // 1.4 < does not return aliases obj
      "num_shards" -> JsNumber((routingTable \ "shards").as[JsObject].keys.map(_.toInt).max + 1),
      "num_replicas" -> JsNumber((routingTable \ "shards" \ "0").as[JsArray].value.size - 1),
      "shards" -> JsObject(shardMap)
    ))
  }

  /**
    * Reads if index block is due to index being closed
    * @param block
    * @return
    */
  def isClosed(block: JsObject): JsBoolean =
    JsBoolean((block \ "4").isDefined)

  /**
    * Parses shard information as a pair where first element is the allocating node and value
    * is the shard representation itself.
    *
    * For relocating shards, creates an extra shard with INITIALIZING state allocated to the target node
    *
    * @param shard
    * @return
    */
  def parseShard(shard: JsValue): Seq[(String, JsValue)] = {
    Seq((shard \ "node").asOpt[String].getOrElse("unassigned") -> shard) ++
      (shard \ "relocating_node").asOpt[String].map(createInitializingShard(_, shard)).toSeq
  }

  /**
    * Transforms the routing table in a map where the keys are node ids and the values are
    * the list of shards allocated to the given node. For unassigned shards, unassigned is used
    * as the key.
    *
    * @param routingTable
    * @return
    */
  def createShardMap(routingTable: JsValue): Map[String, JsArray] = {
    (routingTable \ "shards").as[JsObject].value.toSeq.flatMap { case (_, shards) =>
      shards.as[JsArray].value.flatMap(parseShard(_))
    }.groupBy(_._1).view.mapValues(v => JsArray(v.map(_._2))).toMap
  }

  /**
    * Returns true if at least one of the index shards is considered unhealthy
    *
    * @param shardMap
    * @return
    */
  private def isIndexUnhealthy(shardMap: Map[String, JsArray]): Boolean =
    shardMap.values.exists { shards =>
      shards.value.exists { shard => isShardUnhealthy(shard) }
    }


  /**
    * Returns true if the shard state is other than STARTED
    *
    * @param shard
    * @return
    */
  private def isShardUnhealthy(shard: JsValue): Boolean =
    !(shard \ "state").as[String].equals("STARTED")

  /**
    * Creates an artificial shard with initializing state allocated to the target node
    *
    * @param targetNode
    * @param shard
    * @return
    */
  private def createInitializingShard(targetNode: String, shard: JsValue): (String, JsValue) =
    (targetNode -> Json.obj(
      "node" -> JsString(targetNode),
      "index" -> (shard \ "index").as[JsValue],
      "state" -> JsString("INITIALIZING"),
      "shard" -> (shard \ "shard").as[JsValue],
      "primary" -> JsBoolean(false)
    ))

}
