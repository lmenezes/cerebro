package models

import play.api.mvc.Headers

case class ElasticServer(host: String, authentication: Option[ESAuth] = None, forwardHeadersNames: Seq[String] = Seq.empty) {

  protected var _headers: Seq[(String, String)] = Seq()

  def setForwardHeader(headers : Headers) {
    for (e <- forwardHeadersNames) {
      if (headers.hasHeader(e)) {
        _headers = _headers :+ (e, headers.get(e).orNull)
      }
    }
  }

  def forwardHeaders(): Seq[(String, String)] = _headers
}
