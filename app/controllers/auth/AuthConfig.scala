package controllers.auth

import play.api.Configuration

trait AuthConfig {

  def getSetting(setting: String)(implicit config: Configuration) = {
    config.getOptional[String](setting).getOrElse(throw MissingSettingException(setting))
  }

}
