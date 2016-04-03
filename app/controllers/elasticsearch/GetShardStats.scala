package controllers.elasticsearch

import elastic.ElasticClient._
import elastic.ElasticResponse
import models.ShardStats
import scala.concurrent.ExecutionContext.Implicits.global

class GetShardStats extends ElasticsearchController {

  def index = processRequest { request =>
    val index = request.get("index")
    val node = request.get("node")
    val shard = request.getInt("shard")
    getShardStats(index, request.host).zip(getIndexRecovery(index, request.host)).map {
      case (indexStats, indexRecovery) =>
        val stats = ShardStats(index, node, shard, indexStats.body, indexRecovery.body)
        ElasticResponse(200, stats)
    }
  }

}
