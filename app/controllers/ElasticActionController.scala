package controllers

import elastic.ElasticResponse
import models.CerebroRequest

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

trait ElasticActionController extends BaseController {

  def processRequest = request => processElasticRequest(request).map {
    response => Status(response.status)(response.body)
  }

  def processElasticRequest: CerebroRequest => Future[ElasticResponse]

}
