package controllers

import models.ShardStats

import scala.concurrent.ExecutionContext.Implicits.global

class GetShardStats extends BaseController {

  def processRequest = (request, client) => {
    client.getShardStats(request.get("index"), request.host).zip(client.getIndexRecovery(request.get("index"), request.host)).map {
      case (stats, recovery) =>
        val shardStats = ShardStats(request.get("index"), request.get("node"), request.getInt("shard"), stats.body, recovery.body)
        Status(200)(shardStats)
    }
  }

}
