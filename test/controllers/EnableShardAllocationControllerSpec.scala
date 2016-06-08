package controllers

import elastic.{ElasticClient, ElasticResponse}
import models.{CerebroRequest, ElasticServer}
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.FakeApplication

import scala.concurrent.duration.Duration
import scala.concurrent.{Await, Future}

object EnableShardAllocationControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    EnableShardAllocationController should ${step(play.api.Play.start(FakeApplication()))}
      invoke enableShardAllocation         $enableShardAllocation
                                           ${step(play.api.Play.stop(FakeApplication()))}
      """

  val controller = new EnableShardAllocationController

  def enableShardAllocation = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "acknowledged": true,
        |  "persistent": {},
        |  "transient": {
        |    "cluster": {
        |      "routing": {
        |        "allocation": {
        |          "enable": "all"
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost")
    val client = mock[ElasticClient]
    client.enableShardAllocation(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val response = Await.result(controller.processElasticRequest(CerebroRequest(body), client), Duration("1s"))
    there was one(client).enableShardAllocation(ElasticServer("somehost", None))
    response.body mustEqual expectedResponse
    response.status mustEqual 200
  }

}
