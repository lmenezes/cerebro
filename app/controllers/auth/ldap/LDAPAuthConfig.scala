package controllers.auth.ldap

import controllers.auth.AuthConfig
import play.api.Configuration

class LDAPAuthConfig(config: Configuration) extends AuthConfig {

  implicit val conf = config

  final val domain = getSetting("user-domain")
  final val userformat = getSetting("user-format")
  final val method = getSetting("method")
  final val url = getSetting("url")
  final val baseDN = getSetting("base-dn")

}
