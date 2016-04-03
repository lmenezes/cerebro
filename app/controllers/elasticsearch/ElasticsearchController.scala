package controllers.elasticsearch

import elastic.ElasticResponse
import models.{CerebroRequest, CerebroRequest$}
import play.api.Logger
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

trait ElasticsearchController extends Controller {

  protected val logger = Logger("elastic")

  def processRequest(f: (CerebroRequest => Future[ElasticResponse])) = Action.async(parse.json) { request =>
    val cRequest = CerebroRequest(request.body)
      try {
        val response = f(cRequest)
        response.map { r =>
          Status(r.status)(r.body)
        }
      } catch {
        case _ => Future.successful(Status(500)(s"Cannot connect to ${cRequest.host}"))
      }
  }

}
