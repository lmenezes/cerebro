package services.exception

case class RequestFailedException(url: String, status: Int, response: String) extends RuntimeException {

  override def getMessage: String = s"Failure for [$url]"

}
