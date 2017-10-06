package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error}
import models.{CerebroResponse, Hosts, ShardStats}
import services.overview.DataService

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterOverviewController @Inject()(val authentication: AuthenticationModule,
                                          val hosts: Hosts,
                                          client: ElasticClient,
                                          data: DataService) extends BaseController {

  def index = process { request =>
    data.getOverviewData(request.target).map { overview =>
      CerebroResponse(200, overview)
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
    val shard = request.get("shard").toInt // TODO ES return as Int?
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
    val shard = request.get("shard").toInt // TODO ES return as Int?
    val from = request.get("from")
    val to = request.get("to")
    val server = request.target
    client.relocateShard(shard, index, from, to, server).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

}
