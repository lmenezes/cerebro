package controllers

import javax.inject.{Inject, Singleton}

import akka.actor.ActorSystem
import controllers.auth.{AuthAction, AuthenticationModule}
import forms.LoginForm
import play.api.Configuration
import play.api.mvc.InjectedController


@Singleton
class AuthController @Inject()(system: ActorSystem,
                               authentication: AuthenticationModule,
                               configuration: Configuration)
  extends InjectedController {

  import AuthController._

  private val badFormMsg = "invalid login form data"


  def index = Action { implicit request =>
    if (authentication.isEnabled) {
      request.session.get(AuthAction.SESSION_USER).map { user =>
        request.session.get(AuthAction.REDIRECT_URL) match {
          case Some(url) =>
            Redirect(url, play.api.http.Status.SEE_OTHER)
          case None =>
            Redirect(routes.Application.index())
        }
      }.getOrElse {
        Ok(views.html.auth.login())
      }
    } else {
      Redirect(routes.Application.index())
    }
  }

  def login = Action { implicit request =>
    LoginForm.form.bindFromRequest().fold(
      formWithErrors => {
        log.error(badFormMsg)
        BadRequest(badFormMsg)
      },
      creds => {
        authentication.authentication(creds.user, creds.password) match {
          case Some(username) =>
            val resp =
              request.session.get(AuthAction.REDIRECT_URL) match {
                case Some(url) => Redirect(url, play.api.http.Status.SEE_OTHER)
                case None => Redirect(routes.Application.index())
              }
            resp.withSession(AuthAction.SESSION_USER -> username)
          case None =>
            Redirect(routes.AuthController.index()).flashing(LOGIN_MSG -> "Incorrect username or password")
        }
      }
    )
  }

  def logout = Action { _ =>
    val prefix = configuration.getOptional[String]("play.http.context").getOrElse("/")
    Redirect(s"${prefix}login").withNewSession
  }

}

object AuthController {
  private val log = org.slf4j.LoggerFactory.getLogger(classOf[AuthController])

  final val LOGIN_MSG = "login-msg"
}
