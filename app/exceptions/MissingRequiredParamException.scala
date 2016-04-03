package exceptions

case class MissingRequiredParamException(name: String) extends Exception(s"Missing required parameter $name")
