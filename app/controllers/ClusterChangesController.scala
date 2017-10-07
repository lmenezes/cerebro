package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroResponse, Hosts}
import services.changes.DataService

import scala.concurrent.ExecutionContext.Implicits.global

class ClusterChangesController @Inject()(val authentication: AuthenticationModule,
                                         val hosts: Hosts,
                                         client: ElasticClient,
                                         data: DataService) extends BaseController {

  def get = process {
    request => data.getData(request.target).map(CerebroResponse(200, _))
  }

}
