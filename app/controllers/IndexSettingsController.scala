package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.ElasticServer

import scala.concurrent.ExecutionContext.Implicits.global

class IndexSettingsController @Inject()(val authentication: AuthenticationModule) extends BaseController {

  def get = process { (request, client) =>
    client.getIndexSettingsFlat(request.get("index"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def update = process { (request, client) =>
    val index = request.get("index")
    val settings = request.getObj("settings")
    client.updateIndexSettings(index, settings, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
