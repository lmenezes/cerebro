package controllers

import elastic.Success
import models.{ElasticServer, Host}
import play.api.libs.json.Json
import play.api.test.FakeRequest
import play.api.test.Helpers._

import scala.concurrent.Future

object ClusterSettingsControllerSpec extends MockedServices {

  def is =
    s2"""
    ClusterSettingsController should                     ${step(play.api.Play.start(application))}
      return cluster settings                            $getSettings
      update cluster settings                            $updateSettings
      require settings to update                         $requireSettings
                                                         ${step(play.api.Play.stop(application))}
      """

  def getSettings = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "persistent": {},
        |  "transient": {}
        |}
      """.stripMargin
    )
    client.getClusterSettings(ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/cluster_settings").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 200, expectedResponse)
  }

  def updateSettings = {
    val body = Json.parse(
      """
        |{
        |  "persistent": {},
        |  "transient": {}
        |}
      """.stripMargin
    )
    val expectedResponse = Json.parse(
      """
        |{
        |  "acknowledged":true,
        |  "persistent": {},
        |  "transient": {}
        |}
      """.stripMargin)
    client.saveClusterSettings(body, ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/cluster_settings/save").withBody(Json.obj("host" -> "somehost", "settings" -> body))).get
    ensure(response, 200, expectedResponse)
  }

  def requireSettings = {
    val response = route(application, FakeRequest(POST, "/cluster_settings/save").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 400, Json.parse("{\"error\":\"Missing required parameter settings\"}"))
  }

}
