package controllers

import elastic.ElasticResponse
import models.ElasticServer
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
    client.getClusterSettings(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val response = route(FakeRequest(POST, "/cluster_settings").withBody(Json.obj("host" -> "somehost"))).get
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
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
    client.saveClusterSettings(body, ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val response = route(FakeRequest(POST, "/cluster_settings/save").withBody(Json.obj("host" -> "somehost", "settings" -> body))).get
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }

  def requireSettings = {
    val response = route(FakeRequest(POST, "/cluster_settings/save").withBody(Json.obj("host" -> "somehost"))).get
    (status(response) mustEqual 400) and (contentAsJson(response) mustEqual Json.parse("{\"error\":\"Missing required parameter settings\"}"))
  }

}
