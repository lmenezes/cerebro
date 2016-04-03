package exceptions

case class MissingRequiredParamException(name: String) extends Exception
