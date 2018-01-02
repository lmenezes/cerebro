package controllers

import controllers.auth.{AuthAction, AuthenticationModule}
import play.api.mvc.InjectedController

import scala.concurrent.ExecutionContext

trait AuthSupport { self: InjectedController =>

  def AuthAction(authentication: AuthenticationModule, redirect: Boolean = false)(implicit ec: ExecutionContext): AuthAction =
    new AuthAction(authentication, redirect, parse.anyContent)

}