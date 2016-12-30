package controllers

import controllers.auth.{AuthAction, AuthenticationModule}
import play.api.mvc.Controller

trait AuthSupport { self: Controller =>

  def AuthAction(authentication: AuthenticationModule): AuthAction =
    new AuthAction(authentication)

}