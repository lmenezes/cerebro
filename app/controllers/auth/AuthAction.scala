package controllers.auth

import controllers.routes
import models.CerebroResponse
import play.api.libs.json.JsNull
import play.api.mvc._

import scala.concurrent.Future

class AuthRequest[A](val username: String, request: Request[A]) extends WrappedRequest[A](request)

final class AuthAction(auth: AuthenticationModule, redirect: Boolean) extends ActionBuilder[AuthRequest] {

  def invokeBlock[A](request: Request[A], block: (AuthRequest[A]) => Future[Result]) = {
    if (auth.isEnabled) {
      request.session.get(AuthAction.SESSION_USER).map { username =>
        block(new AuthRequest(username, request))
      }.getOrElse {
        if (redirect) {
          Future.successful(
            Results.Redirect(routes.AuthController.index).
              withSession(AuthAction.REDIRECT_URL -> request.uri))
        } else {
          Future.successful(CerebroResponse(303, JsNull))
        }
      }
    } else {
      block(new AuthRequest("guest", request))
    }
  }

}

object AuthAction {

  private[controllers] val SESSION_USER = "username"
  private[controllers] val REDIRECT_URL = "redirect"

}