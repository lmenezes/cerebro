package controllers

import controllers.auth.{AuthRequest, AuthenticationModule}
import exceptions.MissingRequiredParamException
import models.{CerebroRequest, CerebroResponse, Hosts}
import play.api.Logger
import play.api.libs.json.{JsValue, Json}
import play.api.mvc.{Controller, InjectedController, Result}
import services.exception.RequestFailedException

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.control.NonFatal

trait BaseController extends InjectedController with AuthSupport {

  val authentication: AuthenticationModule

  val hosts: Hosts

  type RequestProcessor = (CerebroRequest) => Future[Result]

  final def process(processor: RequestProcessor) = AuthAction(authentication).async(parse.json) { request =>
    try {
      processor(CerebroRequest(request, hosts)).recoverWith {
        case request: RequestFailedException =>
          Future.successful(CerebroResponse(request.status, Json.obj("error" -> request.getMessage)))
        case NonFatal(e) =>
          Logger.error(s"Error processing request [${formatRequest(request)}]", e)
          Future.successful(CerebroResponse(500, Json.obj("error" -> e.getMessage)))
      }
    } catch {
      case e: MissingRequiredParamException =>
        Future.successful(CerebroResponse(400, Json.obj("error" -> e.getMessage)))
      case NonFatal(e) =>
        Logger.error(s"Error processing request [${formatRequest(request)}]", e)
        Future.successful(CerebroResponse(500, Json.obj("error" -> e.getMessage)))
    }
  }

  private def formatRequest(request: AuthRequest[JsValue]): String = {
    s"path: ${request.uri}, body: ${request.body.toString}"
  }

}
