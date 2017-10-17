package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error}
import models.commons.{Indices, Nodes}
import models.{CerebroResponse, Hosts}
import play.api.libs.json.Json
import services.cluster_changes.ClusterChangesDataService

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class ClusterChangesController @Inject()(val authentication: AuthenticationModule,
                                         val hosts: Hosts,
                                         service: ClusterChangesDataService) extends BaseController {

  def get = process { request =>
    service.data(request.target).map(CerebroResponse(200, _))
  }

}
