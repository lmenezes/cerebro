package controllers.auth.ldap

import java.util.Hashtable
import javax.naming._
import javax.naming.directory._

import com.google.inject.Inject
import controllers.auth.AuthService
import play.api.Configuration

import scala.util.control.NonFatal

class LDAPAuthService @Inject()(globalConfig: Configuration) extends AuthService {

  private val log = org.slf4j.LoggerFactory.getLogger(classOf[LDAPAuthService])

  private final val config = new LDAPAuthConfig(globalConfig.get[Configuration]("auth.settings"))

  def auth(username: String, password: String): Option[String] = {
    val env = new Hashtable[String, String](11)
    env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory")
    env.put(Context.PROVIDER_URL, s"${config.url}/${config.baseDN}")
    env.put(Context.SECURITY_AUTHENTICATION, config.method)
    if (username.endsWith(s"@${config.domain}")) {
      env.put(Context.SECURITY_PRINCIPAL, username)
    } else {
      env.put(Context.SECURITY_PRINCIPAL, s"$username@${config.domain}")
    }
    env.put(Context.SECURITY_CREDENTIALS, password)

    try {
      val ctx = new InitialDirContext(env)
      ctx.close()
      Some(username)
    } catch {
      case ex: AuthenticationException =>
        log.info(s"login of $username failed with: ${ex.getMessage}")
        None
      case NonFatal(e) =>
        log.error(s"login of $username failed", e)
        None
    }
  }

}
