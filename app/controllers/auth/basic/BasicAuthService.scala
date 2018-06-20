package controllers.auth.basic

import com.google.inject.Inject
import controllers.auth.AuthService
import play.api.Configuration

class BasicAuthService @Inject()(globalConfig: Configuration) extends AuthService {

  private implicit final val config = new BasicAuthConfig(globalConfig.get[Configuration]("auth.settings"))

  def auth(username: String, password: String): Option[String] = {
    (username, password) match {
      case (config.username, config.password) => Some(username)
      case _ => None
    }
  }

}
