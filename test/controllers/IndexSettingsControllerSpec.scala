package controllers

import elastic.Success
import models.{ElasticServer, Host}
import play.api.libs.json.Json
import play.api.test.FakeRequest
import play.api.test.Helpers._

import scala.concurrent.Future

object IndexSettingsControllerSpec extends MockedServices {

  def is =
    s2"""
    IndexSettingsController should            ${step(play.api.Play.start(application))}
      return index settings                   $get
      update index settings                   $update
                                              ${step(play.api.Play.stop(application))}
      """

  def get = {
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
    client.getIndexSettingsFlat("foo", ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/index_settings").withBody(Json.obj("host" -> "somehost", "index" -> "foo"))).get
    ensure(response, 200, expectedResponse)
  }

  def update = {
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
    client.updateIndexSettings("foo", body, ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/index_settings/update").withBody(Json.obj("host" -> "somehost", "index" -> "foo", "settings" -> body))).get
    ensure(response, 200, expectedResponse)
  }

}
