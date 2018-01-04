package controllers.auth

import com.google.inject.{ImplementedBy, Inject, Singleton}
import controllers.auth.basic.BasicAuthService
import controllers.auth.ldap.LDAPAuthService
import play.api.Configuration

@ImplementedBy(classOf[AuthenticationModuleImpl])
trait AuthenticationModule {

  def authentication(username: String, password: String): Option[String]

  def isEnabled: Boolean

}

@Singleton
class AuthenticationModuleImpl @Inject()(config: Configuration) extends AuthenticationModule {

  val service = config.getOptional[String]("auth.type") match {
    case Some("ldap")  => Some(new LDAPAuthService(config))
    case Some("basic") => Some(new BasicAuthService(config))
    case _             => None
  }

  def isEnabled: Boolean = {
    service.isDefined
  }

  def authentication(username: String, password: String): Option[String] = {
    service.getOrElse(throw new RuntimeException("No authentication modules is active")).auth(username, password)
  }

}
