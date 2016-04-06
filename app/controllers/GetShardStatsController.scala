package controllers

import models.ShardStats

import scala.concurrent.ExecutionContext.Implicits.global

class GetShardStatsController extends BaseController {

  def processRequest = (request, client) => {
    val index = request.get("index")
    val shard = request.getInt("shard")
    val node = request.get("node")
    client.getShardStats(index, request.host).zip(client.getIndexRecovery(index, request.host)).map {
      case (stats, recovery) =>
        Status(200)(ShardStats(index, node, shard, stats.body, recovery.body))
    }
  }

}
