package controllers

import elastic.ElasticClient
import models.CerebroRequest
import play.api.Logger
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller, Result}

import scala.concurrent.Future
import scala.util.control.NonFatal

trait BaseController extends Controller {

  protected val logger = Logger("elastic")

  final def execute = Action.async(parse.json) { request =>
    try {
      processRequest(CerebroRequest(request.body), ElasticClient)
    } catch {
      case NonFatal(e) => Future.successful(Status(500)(Json.obj("error" -> "Error"))) // FIXME: proper error handling
    }
  }

  def processRequest: (CerebroRequest, ElasticClient) => Future[Result]

}
