package controllers

import elastic.{ElasticClient, ElasticResponse}
import models.ElasticServer
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test.{FakeApplication, FakeRequest}

import scala.concurrent.Future

object IndexSettingsControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    IndexSettingsController should            ${step(play.api.Play.start(FakeApplication()))}
      return index settings                   $get
      update index settings                   $update
                                              ${step(play.api.Play.stop(FakeApplication()))}
      """

  def get = {
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |{
        |  "foo": {
        |    "settings": {
        |      "index.auto_expand_replicas": "0-all"
        |    },
        |    "defaults": {
        |      "index.allocation.max_retries": "5",
        |      "index.data_path": "",
        |      "index.write.wait_for_active_shards": "1"
        |    }
        |  }
        |}
      """.stripMargin
    )
    mockedClient.getIndexSettingsFlat("foo", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new IndexSettingsController {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.get()(FakeRequest().withBody(Json.obj("host" -> "somehost", "index" -> "foo")))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }

  def update = {
    val mockedClient = mock[ElasticClient]
    val body = Json.parse(
      """
        |{
        |  "index.auto_expand_replicas": "0-all",
        |  "index.allocation.max_retries": "5",
        |  "index.data_path": "",
        |  "index.write.wait_for_active_shards": "1"
        |}
      """.stripMargin
    )
    val expectedResponse = Json.parse(
      """
        |{
        |  "acknowledged":true
        |}
      """.stripMargin)
    mockedClient.updateIndexSettings("foo", body, ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new IndexSettingsController {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.update()(FakeRequest().withBody(Json.obj("host" -> "somehost", "index" -> "foo", "settings" -> body)))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }

}
