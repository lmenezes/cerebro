package controllers.auth

import controllers.routes
import models.{CerebroResponse, User}
import play.api.libs.json.JsNull
import play.api.mvc._

import scala.concurrent.{ExecutionContext, Future}

class AuthRequest[A](val user: Option[User], request: Request[A]) extends WrappedRequest[A](request)

final class AuthAction(auth: AuthenticationModule, redirect: Boolean, override val parser: BodyParser[AnyContent])(implicit ec: ExecutionContext)
  extends ActionBuilder[AuthRequest, AnyContent] {

  def invokeBlock[A](request: Request[A], block: (AuthRequest[A]) => Future[Result]) = {
    if (auth.isEnabled) {
      request.session.get(AuthAction.SESSION_USER).map { username =>
        block(new AuthRequest(Some(User(username)), request))
      }.getOrElse {
        if (redirect) {
          Future.successful(
            Results.Redirect(routes.AuthController.index()).
              withSession(AuthAction.REDIRECT_URL -> request.uri))
        } else {
          Future.successful(CerebroResponse(303, JsNull))
        }
      }
    } else {
      block(new AuthRequest(None, request))
    }
  }

  override protected def executionContext: ExecutionContext = ec
}

object AuthAction {

  private[controllers] val SESSION_USER = "username"
  private[controllers] val REDIRECT_URL = "redirect"

}