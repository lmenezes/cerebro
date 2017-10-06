package models

import play.api.libs.json.{JsArray, JsNull, JsValue}

object ShardStats {

  def apply(index: String, node: String, shard: Int, stats: JsValue, recovery: JsValue): JsValue = {
    val shardStats = getShardStats(index, node, shard, stats)
    shardStats.getOrElse(getShardRecovery(index, node, shard, recovery).getOrElse(JsNull))
  }

  private def matchesNode(node: String, shardNode: String): Boolean = {
    shardNode.equals(node) || shardNode.startsWith(node)
  }

  private def getShardStats(index: String, node: String, shard: Int, stats: JsValue): Option[JsValue] =
    (stats \ "indices" \ index \ "shards" \ shard.toString).asOpt[JsArray] match {
      case Some(JsArray(shards)) => shards.find(s => matchesNode(node, (s \ "routing" \ "node").as[String]))
      case _ => None
    }

  private def getShardRecovery(index: String, node: String, shard: Int, recovery: JsValue): Option[JsValue] =
    (recovery \ index \ "shards").asOpt[JsArray] match {
      case Some(JsArray(recoveries)) =>
        recoveries.find(r => matchesNode(node, (r \ "target" \ "id").as[String]) && (r \ "id").as[Int] == shard)
      case _ => None
    }


}
