package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error}
import models.overview.ClusterOverview
import models.{CerebroResponse, Hosts, ShardStats}
import services.overview.OverviewDataService

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterOverviewController @Inject()(val authentication: AuthenticationModule,
                                          val hosts: Hosts,
                                          val service: OverviewDataService,
                                          client: ElasticClient) extends BaseController {

  def index = process { request =>
    service.overview(request.target).map(CerebroResponse(200, _))
  }

  def disableShardAllocation = process { request =>
    val kind = request.get("kind")
    client.disableShardAllocation(request.target, kind).map { response =>
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

  def flushIndex = process { request =>
    client.flushIndex(request.get("indices"), request.target).map { response =>
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
