package controllers

import models.{ElasticServer, ShardStats}

import scala.concurrent.ExecutionContext.Implicits.global

class GetShardStatsController extends BaseController {

  def execute = process { (request, client) =>
    val index = request.get("index")
    val shard = request.getInt("shard")
    val node = request.get("node")
    client.getShardStats(index, ElasticServer(request.host, request.authentication)).zip(client.getIndexRecovery(index, ElasticServer(request.host, request.authentication))).map {
      case (stats, recovery) =>
        Status(200)(ShardStats(index, node, shard, stats.body, recovery.body))
    }
  }

}
