package controllers

import elastic.{ElasticClient, ElasticResponse}
import models.CerebroRequest

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

trait ElasticActionController extends BaseController {

  final def processRequest = (request, client) => processElasticRequest(request, client).map {
    response => Status(response.status)(response.body)
  }

  def processElasticRequest: (CerebroRequest, ElasticClient) => Future[ElasticResponse]

}
