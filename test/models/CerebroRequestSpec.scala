package models

import controllers.auth.AuthRequest
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.{JsValue, Json}
import play.api.mvc.Headers

object CerebroRequestSpec extends Specification with Mockito {

  def is =
    s2"""
    CerebroRequest should
        should forward whitelisted headers          $forwardHeaders

      """

  private def forwardHeaders = {
    val user = None
    val whitelistHeaders = Seq("a-header")
    val body = Json.obj("host" -> "host1")
    val host
    = Host("host1", None, whitelistHeaders)

    val request = mock[AuthRequest[JsValue]]
    request.body returns body
    request.headers returns Headers("a-header" -> "content")
    request.user returns user

    val hosts = mock[Hosts]
    hosts.getHost("host1") returns Some(host)

    CerebroRequest(request, hosts) === CerebroRequest(ElasticServer(host, Seq("a-header" -> "content")), body, user)
  }

}
