package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.{ElasticServer, IndexMetadata, ShardStats}
import models.overview.ClusterOverview

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterOverviewController @Inject()(val authentication: AuthenticationModule) extends BaseController {

  def index = process { (request, client) =>
    Future.sequence(
      Seq(
        client.clusterState(ElasticServer(request.host, request.authentication)),
        client.nodesStats(ElasticServer(request.host, request.authentication)),
        client.indicesStats(ElasticServer(request.host, request.authentication)),
        client.clusterSettings(ElasticServer(request.host, request.authentication)),
        client.aliases(ElasticServer(request.host, request.authentication)),
        client.clusterHealth(ElasticServer(request.host, request.authentication)),
        client.nodes(ElasticServer(request.host, request.authentication)),
        client.main(ElasticServer(request.host, request.authentication))
      )
    ).map { f =>
      new ClusterOverview(f(0).body, f(1).body, f(2).body, f(3).body, f(4).body, f(5).body, f(6).body, f(7).body).json
    }.map(Ok(_))
  }

  def disableShardAllocation = process { (request, client) =>
    client.disableShardAllocation(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def enableShardAllocation = process { (request, client) =>
    client.enableShardAllocation(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def closeIndices = process { (request, client) =>
    client.closeIndex(request.get("indices"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def openIndices = process { (request, client) =>
    client.openIndex(request.get("indices"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def forceMerge = process { (request, client) =>
    client.forceMerge(request.get("indices"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def clearIndexCache = process { (request, client) =>
    client.clearIndexCache(request.get("indices"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def refreshIndex = process { (request, client) =>
    client.refreshIndex(request.get("indices"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def deleteIndex = process { (request, client) =>
    client.deleteIndex(request.get("indices"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def getShardStats = process { (request, client) =>
    val index = request.get("index")
    val shard = request.getInt("shard")
    val node = request.get("node")
    client.getShardStats(index, ElasticServer(request.host, request.authentication)).zip(
      client.getIndexRecovery(index, ElasticServer(request.host, request.authentication))
    ).map {
      case (stats, recovery) => Status(200)(ShardStats(index, node, shard, stats.body, recovery.body))
    }
  }

  def relocateShard = process { (request, client) =>
    val index = request.get("index")
    val shard = request.getInt("shard")
    val from = request.get("from")
    val to = request.get("to")
    val server = ElasticServer(request.host, request.authentication)
    client.relocateShard(shard, index, from, to, server).map { response =>
      Status(response.status)(response.body)
    }
  }

}
