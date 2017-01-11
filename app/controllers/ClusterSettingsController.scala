package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.ElasticServer

import scala.concurrent.ExecutionContext.Implicits.global

class ClusterSettingsController @Inject()(val authentication: AuthenticationModule,
                                          client: ElasticClient) extends BaseController {

  def getSettings = process { request =>
    client.getClusterSettings(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def save = process { request =>
    val settings = request.getObj("settings")
    client.saveClusterSettings(settings, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
