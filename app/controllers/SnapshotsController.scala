package controllers

import models.ElasticServer
import models.commons.Indices
import models.snapshot.{Repositories, Snapshots}
import play.api.libs.json.Json

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class SnapshotsController extends BaseController {

  def get = process { (request, client) =>
    Future.sequence(Seq(
      client.getIndices(ElasticServer(request.host, request.authentication)),
      client.getRepositories(ElasticServer(request.host, request.authentication))
    )).map { responses =>
      Json.obj(
        "indices" -> Indices(responses(0).body),
        "repositories" -> Repositories(responses(1).body)
      )
    }.map(Ok(_))
  }

  def getSnapshots = process { (request, client) =>
    val repository = request.get("repository")
    client.getSnapshots(repository, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Snapshots(response.body))
    }
  }

  def delete = process { (request, client) =>
    val repository = request.get("repository")
    val snapshot = request.get("snapshot")
    client.deleteSnapshot(repository, snapshot, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def create = process { (request, client) =>
    val repository = request.get("repository")
    val snapshot = request.get("snapshot")
    val indices = request.getAsStringArray("indices").map(_.mkString)
    val ignoreUnavailable = request.getBoolean("ignoreUnavailable")
    val includeGlobalState = request.getBoolean("includeGlobalState")
    client.createSnapshot(repository, snapshot, ignoreUnavailable,
      includeGlobalState, indices, ElasticServer(request.host, request.authentication)).map {
      response => Status(response.status)(response.body)
    }
  }

  def restore = process { (request, client) =>
    val repository = request.get("repository")
    val snapshot = request.get("snapshot")
    val renamePattern = request.getOpt("renamePattern")
    val renameReplacement = request.getOpt("renameReplacement")
    val ignoreUnavailable = request.getBoolean("ignoreUnavailable")
    val includeAliases = request.getBoolean("includeAliases")
    val includeGlobalState = request.getBoolean("includeGlobalState")
    val indices = request.getAsStringArray("indices").map(_.mkString)
    client.restoreSnapshot(repository, snapshot, renamePattern,
      renameReplacement, ignoreUnavailable, includeAliases, includeGlobalState,
      indices, ElasticServer(request.host, request.authentication)).map {
      response => Status(response.status)(response.body)
    }
  }
}
