package controllers.auth.ldap

import controllers.auth.AuthConfig
import play.api.Configuration

class LDAPAuthConfig(config: Configuration) extends AuthConfig {

  implicit val conf = config

  final val userTemplate = getSetting("user-template")
  final val method = getSetting("method")
  final val url = getSetting("url")
  final val baseDN = getSetting("base-dn")
  final val bindDN = getSetting("bind-dn")
  final val bindPwd = getSetting("bind-pw")


  final val groupMembership: Option[LDAPGroupSearchConfig] = {
    val groupAuthConfig = config.get[Configuration]("group-search")
    groupAuthConfig.getOptional[String]("group").map { group =>
      LDAPGroupSearchConfig(
        groupAuthConfig.getOptional[String]("base-dn").getOrElse(baseDN),
        getSetting("user-attr")(groupAuthConfig),
        groupAuthConfig.getOptional[String]("user-attr-template").getOrElse(userTemplate),
        group
      )
    }
  }
}

case class LDAPGroupSearchConfig(baseDN: String, userAttr: String, userAttrTemplate:String, group: String)
