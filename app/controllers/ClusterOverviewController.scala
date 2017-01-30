package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error}
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
    ).map { responses =>
      val failed = responses.find(_.isInstanceOf[Error])
      failed match {
        case Some(f) => CerebroResponse(f.status, f.body)
        case None =>
          val overview = ClusterOverview(
            responses(0).body,
            responses(1).body,
            responses(2).body,
            responses(3).body,
            responses(4).body,
            responses(5).body,
            responses(6).body,
            responses(7).body
          )
          CerebroResponse(200, overview)
      }
    }
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
    Future.sequence(
      Seq(
        client.getShardStats(index, request.target),
        client.getIndexRecovery(index, request.target)
      )
    ).map { responses =>
      val failed = responses.find(_.isInstanceOf[Error])
      failed match {
        case None =>
          val stats = responses(0).body
          val recovery = responses(1).body
          CerebroResponse(200, ShardStats(index, node, shard, stats, recovery))
        case Some(f) =>
          CerebroResponse(f.status, f.body)
      }
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
