package controllers

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import org.specs2.Specification
import org.specs2.mock.Mockito
import org.specs2.specification.BeforeEach
import play.api.inject.bind
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.libs.json.JsValue
import play.api.mvc.Result
import play.api.test.Helpers.{contentAsJson, _}

import scala.concurrent.Future

trait MockedServices extends Specification with BeforeEach with Mockito {

  val client = mock[ElasticClient]

  val auth = mock[AuthenticationModule]
  auth.isEnabled returns false

  override def before = {
    org.mockito.Mockito.reset(client)
  }

  val application = new GuiceApplicationBuilder().
    overrides(
      bind[ElasticClient].toInstance(client),
      bind[AuthenticationModule].toInstance(auth)
    ).build()

  def ensure(response: Future[Result], statusCode: Int, body: JsValue) = {
    ((contentAsJson(response) \ "body").as[JsValue] mustEqual body) and
      ((contentAsJson(response) \ "status").as[Int] mustEqual statusCode)
  }

}
