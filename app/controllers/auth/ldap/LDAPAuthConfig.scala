package controllers.auth.ldap

import controllers.auth.AuthConfig
import play.api.Configuration

class LDAPAuthConfig(config: Configuration) extends AuthConfig {

  implicit val conf = config

  final val domain = getSetting("user-domain")
  final val method = getSetting("method")
  final val url = getSetting("url")
  final val baseDN = getSetting("base-dn")
  final val bindDN = getSetting("bind-dn")
  final val bindPW = getSetting("bind-pw")
  final val userAttr = getSetting("userAttr")
  final val userGroup = getSetting("userGroup")
}
