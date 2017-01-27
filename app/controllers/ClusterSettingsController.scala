package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroResponse, Hosts}

import scala.concurrent.ExecutionContext.Implicits.global

class ClusterSettingsController @Inject()(val authentication: AuthenticationModule,
                                          val hosts: Hosts,
                                          client: ElasticClient) extends BaseController {

  def getSettings = process { request =>
    client.getClusterSettings(request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def save = process { request =>
    val settings = request.getObj("settings")
    client.saveClusterSettings(settings, request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

}
