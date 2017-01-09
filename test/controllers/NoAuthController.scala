package controllers

import controllers.auth.AuthenticationModule

trait NoAuthController {

  val auth: AuthenticationModule = new AuthenticationModule {

    override def authentication(username: String, password: String) = None

    override def isEnabled: Boolean = false
  }

}
