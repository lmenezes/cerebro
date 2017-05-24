package controllers.auth.ldap

import com.google.inject.Inject
import controllers.auth.AuthService
import play.api.Configuration
import java.util.Hashtable

import scala.collection.JavaConversions.enumerationAsScalaIterator
import com.sun.jndi.ldap.LdapCtxFactory
import javax.naming.directory.SearchControls.SUBTREE_SCOPE
import javax.naming.directory.SearchControls
import javax.naming.{AuthenticationException, Context}

class LDAPAuthService @Inject()(globalConfig: Configuration) extends AuthService {

  private val log = org.slf4j.LoggerFactory.getLogger(classOf[LDAPAuthService])

  private final val config = new LDAPAuthConfig(globalConfig.getConfig("auth.settings").get)

  def checkGroupMembership(username: String, password: String): Boolean = {
    val props = new Hashtable[String, String]()
    props.put(Context.SECURITY_PRINCIPAL, config.bindDN)
    props.put(Context.SECURITY_CREDENTIALS, config.bindPW)
    props.put(Context.REFERRAL, "follow")
    val controls = new SearchControls()
    controls.setSearchScope(SUBTREE_SCOPE)
    try {
      val context = LdapCtxFactory.getLdapCtxInstance(config.url, props)
      val renum = context.search(config.baseDN, "(& ("+config.userAttr+"="+username+"))", controls)
      val check: Boolean = if (!renum.hasMore()) {
        log.info(s"Cannot locate user information for $username")
        false
      } else {
        val groups = renum.flatMap(f => {
          val memberof = f.getAttributes().get("memberof").getAll
          val groups = memberof.map(f => {

            f.toString()

          })
          groups
        })
        groups.contains(config.userGroup)
      }
      check
    } catch {
      case authError:AuthenticationException => log.error(s"Authentification failed: $authError"); false
    }
  }

  def auth(username: String, password: String): Option[String] = {
    val verify = checkGroupMembership(username, password)
    if(verify) {
      Some(username)
    } else {
      log.error(s"login of $username failed")
      None
    }
  }

}
