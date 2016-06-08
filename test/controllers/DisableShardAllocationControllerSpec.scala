package controllers

import elastic.{ElasticClient, ElasticResponse}
import models.{CerebroRequest, ElasticServer}
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.FakeApplication

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}

object DisableShardAllocationControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    DisableShardAllocationController should ${step(play.api.Play.start(FakeApplication()))}
      invoke disableShardAllocation         $disableShardAllocation
                                            ${step(play.api.Play.stop(FakeApplication()))}
      """

  val controller = new DisableShardAllocationController

  def disableShardAllocation = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "acknowledged": true,
        |  "persistent": {},
        |  "transient": {
        |    "cluster": {
        |      "routing": {
        |        "allocation": {
        |          "enable": "none"
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost")
    val client = mock[ElasticClient]
    client.disableShardAllocation(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val response = Await.result(controller.processElasticRequest(CerebroRequest(body), client), Duration("1s"))
    there was one(client).disableShardAllocation(ElasticServer("somehost", None))
    response.body mustEqual expectedResponse
    response.status mustEqual 200
  }

}
