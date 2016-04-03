package controllers

import elastic.ElasticClient.{getIndexRecovery, getShardStats}
import models.ShardStats

import scala.concurrent.ExecutionContext.Implicits.global

class GetShardStats extends BaseController {

  def processRequest = { r =>
    getShardStats(r.get("index"), r.host).zip(getIndexRecovery(r.get("index"), r.host)).map {
      case (stats, recovery) =>
        val shardStats = ShardStats(r.get("index"), r.get("node"), r.getInt("shard"), stats.body, recovery.body)
        Status(200)(shardStats)
    }
  }

}
