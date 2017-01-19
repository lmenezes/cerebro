package controllers.auth.basic

import controllers.auth.AuthConfig
import play.api.Configuration

class BasicAuthConfig(config: Configuration) extends AuthConfig {

  implicit val conf = config

  final val username = getSetting("username")
  final val password = getSetting("password")

}
