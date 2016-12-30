package controllers.auth

case class MissingSettingException(setting: String)
  extends Exception(s"Missing required setting [$setting]")
