package controllers

import controllers.auth.{AuthAction, AuthenticationModule}
import play.api.mvc.Controller

trait AuthSupport { self: Controller =>

  def AuthAction(authentication: AuthenticationModule, redirect: Boolean = false): AuthAction =
    new AuthAction(authentication, redirect)

}