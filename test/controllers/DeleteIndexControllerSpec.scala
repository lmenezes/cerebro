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

object DeleteIndexControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    DeleteIndexController should                         ${step(play.api.Play.start(FakeApplication()))}
      invoke deleteIndex                                 $deleteIndex
      should throw exception if indices param is missing $missingIndices
                                                         ${step(play.api.Play.stop(FakeApplication()))}
      """

  val controller = new DeleteIndexController

  def deleteIndex = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "acknowledged": true
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "indices" -> "a,b,c")
    val client = mock[ElasticClient]
    client.deleteIndex("a,b,c", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val result = Await.result(controller.processElasticRequest(CerebroRequest(body), client), Duration("1s"))
    there was one(client).deleteIndex("a,b,c", ElasticServer("somehost", None))
    result.body mustEqual expectedResponse
    result.status mustEqual 200
  }

  def missingIndices = {
    val body = Json.obj("host" -> "somehost")
    val client = mock[ElasticClient]
    controller.processElasticRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

}
