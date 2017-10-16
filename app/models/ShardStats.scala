package models

import play.api.libs.json.{JsArray, JsNull, JsValue}

object ShardStats {

  def apply(index: String, node: String, shard: Int, stats: JsValue, recovery: JsValue): JsValue = {
    val shardStats = getShardStats(index, node, shard, stats)
    shardStats.getOrElse(getShardRecovery(index, node, shard, recovery).getOrElse(JsNull))
  }

  private def getShardStats(index: String, node: String, shard: Int, stats: JsValue): Option[JsValue] =
    (stats \ "indices" \ index \ "shards" \ shard.toString).asOpt[JsArray] match {
      case Some(JsArray(shards)) => shards.collectFirst {
        case s if (s \ "routing" \ "node").as[String].equals(node) => s
      }
      case _ => None
    }


  private def getShardRecovery(index: String, node: String, shard: Int, recovery: JsValue): Option[JsValue] =
    (recovery \ index \ "shards").asOpt[JsArray] match {
      case Some(JsArray(recoveries)) => recoveries.collectFirst {
        case r if (r \ "target" \ "id").as[String].equals(node) && (r \ "id").as[Int].equals(shard) => r
      }
      case _ => None
    }


}
