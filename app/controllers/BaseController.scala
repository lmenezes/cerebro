package controllers

import models.CerebroRequest
import play.api.Logger
import play.api.mvc.{Action, Controller, Result}

import scala.concurrent.Future

trait BaseController extends Controller {

  protected val logger = Logger("elastic")

  def execute = Action.async(parse.json) { request =>
    try {
      processRequest(CerebroRequest(request.body))
    } catch {
      case _ => Future.successful(Status(500)(s"Error")) // FIXME: proper error handling
    }
  }

  def processRequest: CerebroRequest => Future[Result]

}
