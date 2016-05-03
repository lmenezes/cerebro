package controllers

import elastic.{ElasticClient, ElasticResponse}
import exceptions.MissingRequiredParamException
import models.CerebroRequest
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.FakeApplication

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}

object RestControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    RestController should                               ${step(play.api.Play.start(FakeApplication()))}
      invoke refreshIndex                               $executeRequest
      should throw exception if method param is missing $missingMethod
      should throw exception if path param is missing   $missingPath
                                                         ${step(play.api.Play.stop(FakeApplication()))}
      """

  val controller = new RestController

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
    val client = mock[ElasticClient]
    client.executeRequest("GET", "/someesapi", "somehost") returns Future.successful(ElasticResponse(200, expectedResponse))
    val response = Await.result(controller.processElasticRequest(CerebroRequest(body), client), Duration("1s"))
    there was one(client).executeRequest("GET", "/someesapi", "somehost")
    response.body mustEqual expectedResponse
    response.status mustEqual 200
  }

  def missingPath = {
    val body = Json.obj("host" -> "somehost", "method" -> "GET")
    val client = mock[ElasticClient]
    controller.processElasticRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

  def missingMethod = {
    val body = Json.obj("host" -> "somehost", "path" -> "GET")
    val client = mock[ElasticClient]
    controller.processElasticRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

}
