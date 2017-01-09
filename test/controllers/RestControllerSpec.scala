package controllers

import elastic.{ElasticClient, ElasticResponse}
import exceptions.MissingRequiredParamException
import models.ElasticServer
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test.{FakeApplication, FakeRequest}

import scala.concurrent.Future

object RestControllerSpec extends Specification with Mockito with NoAuthController {

  def is =
    s2"""
    RestController should                               ${step(play.api.Play.start(FakeApplication()))}
      invoke refreshIndex                               $executeRequest
      should throw exception if method param is missing $missingMethod
      should throw exception if path param is missing   $missingPath
                                                         ${step(play.api.Play.stop(FakeApplication()))}
      """

  def executeRequest = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "_shards": {
        |    "total": 10,
        |    "successful": 5,
        |    "failed": 0
        |  }
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "method" -> "GET", "path" -> "/someesapi")
    val mockedClient = mock[ElasticClient]
    mockedClient.executeRequest("GET", "/someesapi", None, ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new RestController(auth) {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.request()(FakeRequest().withBody(body))
    there was one(mockedClient).executeRequest("GET", "/someesapi", None, ElasticServer("somehost", None))
    contentAsJson(response) mustEqual expectedResponse and
      (status(response) mustEqual 200)
  }

  def missingPath = {
    val body = Json.obj("host" -> "somehost", "method" -> "GET")
    val controller = new RestController(auth)
    val response = controller.request()(FakeRequest().withBody(body))
    contentAsJson(response) mustEqual Json.obj("error" -> "Missing required parameter path") and
      (status(response) mustEqual 400)

  }

  def missingMethod = {
    val body = Json.obj("host" -> "somehost", "path" -> "GET")
    val controller = new RestController(auth)
    val response = controller.request()(FakeRequest().withBody(body))
    contentAsJson(response) mustEqual Json.obj("error" -> "Missing required parameter method") and
      (status(response) mustEqual 400)
  }

}
