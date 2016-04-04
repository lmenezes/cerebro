package controllers

import elastic.{ElasticResponse, ElasticClient}
import exceptions.MissingRequiredParamException
import models.CerebroRequest
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.FakeApplication

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}

object GetIndexSettingsControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    GetIndexSettingsController should                  ${step(play.api.Play.start(FakeApplication()))}
      invoke getIndexSettings                           $getIndexSettings
      should throw exception if index param is missing $missingIndex
                                                       ${step(play.api.Play.stop(FakeApplication()))}
      """

  val controller = new GetIndexSettingsController

  def getIndexSettings = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "someIndex": {
        |    "settings": {
        |      "index": {
        |        "creation_date": "1459675569309",
        |        "number_of_shards": "5",
        |        "number_of_replicas": "1",
        |        "uuid": "6sN-tL30Sfyz_tW0iVqVPQ",
        |        "version": {
        |          "created": "2030099"
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "index" -> "someIndex")
    val client = mock[ElasticClient]
    client.getIndexSettings("someIndex", "somehost") returns Future.successful(ElasticResponse(200, expectedResponse))
    val response = Await.result(controller.processElasticRequest(CerebroRequest(body), client), Duration("1s"))
    there was one(client).getIndexSettings("someIndex", "somehost")
    response.body mustEqual expectedResponse
    response.status mustEqual 200
  }

  def missingIndex = {
    val body = Json.obj("host" -> "somehost")
    val client = mock[ElasticClient]
    controller.processElasticRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

}
