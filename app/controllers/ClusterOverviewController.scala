package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.overview.ClusterOverview
import models.{CerebroResponse, Hosts, ShardStats}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterOverviewController @Inject()(val authentication: AuthenticationModule,
                                          val hosts: Hosts,
                                          client: ElasticClient) extends BaseController {

  def index = process { request =>
    Future.sequence(
      Seq(
        client.clusterState(request.target),
        client.nodesStats(request.target),
        client.indicesStats(request.target),
        client.clusterSettings(request.target),
        client.aliases(request.target),
        client.clusterHealth(request.target),
        client.nodes(request.target),
        client.main(request.target)
      )
    ).map { f =>
      new ClusterOverview(f(0).body, f(1).body, f(2).body, f(3).body, f(4).body, f(5).body, f(6).body, f(7).body).json
    }.map(CerebroResponse(200, _))
  }

  def disableShardAllocation = process { request =>
    client.disableShardAllocation(request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def enableShardAllocation = process { request =>
    client.enableShardAllocation(request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def closeIndices = process { request =>
    client.closeIndex(request.get("indices"), request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def openIndices = process { request =>
    client.openIndex(request.get("indices"), request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def forceMerge = process { request =>
    client.forceMerge(request.get("indices"), request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def clearIndexCache = process { request =>
    client.clearIndexCache(request.get("indices"), request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def refreshIndex = process { request =>
    client.refreshIndex(request.get("indices"), request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def deleteIndex = process { request =>
    client.deleteIndex(request.get("indices"), request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def getShardStats = process { request =>
    val index = request.get("index")
    val shard = request.getInt("shard")
    val node = request.get("node")
    client.getShardStats(index, request.target).zip(
      client.getIndexRecovery(index, request.target)
    ).map {
      case (stats, recovery) => CerebroResponse(200, ShardStats(index, node, shard, stats.body, recovery.body))
    }
  }

  def relocateShard = process { request =>
    val index = request.get("index")
    val shard = request.getInt("shard")
    val from = request.get("from")
    val to = request.get("to")
    val server = request.target
    client.relocateShard(shard, index, from, to, server).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

}
