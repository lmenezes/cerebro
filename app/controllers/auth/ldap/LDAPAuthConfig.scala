package controllers.auth.ldap

import controllers.auth.AuthConfig
import play.api.Configuration

class LDAPAuthConfig(config: Configuration) extends AuthConfig {

  implicit val conf = config

  final val userTemplate = getSetting("user-template")
  final val method = getSetting("method")
  final val url = getSetting("url")
  final val baseDN = getSetting("base-dn")


  final val groupMembership: Option[LDAPGroupSearchConfig] = {
    val bindDN = getSetting("bind-dn")
    val bindPwd = getSetting("bind-pw")
    val groupAuthConfig = config.get[Configuration]("group-search")
    groupAuthConfig.getOptional[String]("group").map { group =>
      LDAPGroupSearchConfig(
        bindDN,
        bindPwd,
        groupAuthConfig.getOptional[String]("base-dn"),
        getSetting("user-attr")(groupAuthConfig),
        groupAuthConfig.getOptional[String]("user-attr-template"),
        group
      )
    }
  }
}

case class LDAPGroupSearchConfig(bindDN: String, bindPwd: String, baseDN: String, userAttr: String, userAttrTemplate:String, group: String)
