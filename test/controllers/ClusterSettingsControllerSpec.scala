package controllers

import elastic.{ElasticClient, ElasticResponse}
import models.ElasticServer
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test.{FakeApplication, FakeRequest}

import scala.concurrent.Future

object ClusterSettingsControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    ClusterSettingsController should                     ${step(play.api.Play.start(FakeApplication()))}
      return cluster settings                            $getSettings
      update cluster settings                            $updateSettings
      require settings to update                         $requireSettings
                                                         ${step(play.api.Play.stop(FakeApplication()))}
      """

  def getSettings = {
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |{
        |  "persistent": {},
        |  "transient": {}
        |}
      """.stripMargin
    )
    mockedClient.getClusterSettings(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new ClusterSettingsController {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.getSettings()(FakeRequest().withBody(Json.obj("host" -> "somehost")))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }

  def updateSettings = {
    val mockedClient = mock[ElasticClient]
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
    mockedClient.saveClusterSettings(body, ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new ClusterSettingsController {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.save()(FakeRequest().withBody(Json.obj("host" -> "somehost", "settings" -> body)))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }

  def requireSettings = {
    val controller = new ClusterSettingsController
    val response = controller.save()(FakeRequest().withBody(Json.obj("host" -> "somehost")))
    (status(response) mustEqual 400) and (contentAsJson(response) mustEqual Json.parse("{\"error\":\"Missing required parameter settings\"}"))
  }


}
