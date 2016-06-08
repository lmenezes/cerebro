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

object CloseIndexControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    CloseIndexController should                          ${step(play.api.Play.start(FakeApplication()))}
      invoke closeIndex                                  $closeIndex
      should throw exception if indices param is missing $missingIndices
                                                         ${step(play.api.Play.stop(FakeApplication()))}
      """

  val controller = new CloseIndexController

  def closeIndex = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "acknowledged": true
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "indices" -> "a,b,c")
    val client = mock[ElasticClient]
    client.closeIndex("a,b,c", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val response = Await.result(controller.processElasticRequest(CerebroRequest(body), client), Duration("1s"))
    there was one(client).closeIndex("a,b,c", ElasticServer("somehost", None))
    response.body mustEqual expectedResponse
    response.status mustEqual 200
  }

  def missingIndices = {
    val body = Json.obj("host" -> "somehost")
    val client = mock[ElasticClient]
    controller.processElasticRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

}
