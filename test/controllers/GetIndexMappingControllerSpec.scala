package controllers

import elastic.{ElasticClient, ElasticResponse}
import exceptions.MissingRequiredParamException
import models.{CerebroRequest, ElasticServer}
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.FakeApplication

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}

object GetIndexMappingControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    GetIndexMappingController should                   ${step(play.api.Play.start(FakeApplication()))}
      invoke getIndexMapping                           $getIndexMapping
      should throw exception if index param is missing $missingIndex
                                                       ${step(play.api.Play.stop(FakeApplication()))}
      """

  val controller = new GetIndexMappingController

  def getIndexMapping = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "someIndex": {
        |    "mappings": {}
        |  }
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "index" -> "someIndex")
    val client = mock[ElasticClient]
    client.getIndexMapping("someIndex", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val response = Await.result(controller.processElasticRequest(CerebroRequest(body), client), Duration("1s"))
    there was one(client).getIndexMapping("someIndex", ElasticServer("somehost", None))
    response.body mustEqual expectedResponse
    response.status mustEqual 200
  }

  def missingIndex = {
    val body = Json.obj("host" -> "somehost")
    val client = mock[ElasticClient]
    controller.processElasticRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

}
