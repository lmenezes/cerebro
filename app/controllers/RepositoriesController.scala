package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.ElasticServer
import models.repository.Repositories

import scala.concurrent.ExecutionContext.Implicits.global

class RepositoriesController @Inject()(val authentication: AuthenticationModule) extends BaseController {

  def get = process { (request, client) =>
    client.getRepositories(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Repositories(response.body))
    }
  }

  def save = process { (request, client) =>
    val name = request.get("name")
    val repoType = request.get("type")
    val settings = request.getObj("settings")
    client.createRepository(name, repoType, settings, ElasticServer(request.host, request.authentication)).map {
      response => Status(response.status)(response.body)
    }
  }

  def delete = process { (request, client) =>
    val name = request.get("name")
    client.deleteRepository(name, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
