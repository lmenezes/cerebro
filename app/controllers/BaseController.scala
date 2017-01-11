package controllers

import controllers.auth.AuthenticationModule
import exceptions.MissingRequiredParamException
import models.CerebroRequest
import play.api.Logger
import play.api.libs.json.Json
import play.api.mvc.{Controller, Result}

import scala.concurrent.Future
import scala.util.control.NonFatal

trait BaseController extends Controller with AuthSupport {

  val authentication: AuthenticationModule

  protected val logger = Logger("elastic")

  type RequestProcessor = (CerebroRequest) => Future[Result]

  final def process(processor: RequestProcessor) = AuthAction(authentication).async(parse.json) { request =>
    try {
      processor(CerebroRequest(request.body))
    } catch {
      case e: MissingRequiredParamException =>
        Future.successful(Status(400)(Json.obj("error" -> e.getMessage))) // FIXME: proper error handling
      case NonFatal(e) =>
        Future.successful(Status(500)(Json.obj("error" -> "Error"))) // FIXME: proper error handling
    }
  }

}
