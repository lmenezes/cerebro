package controllers

import elastic.{ElasticClient, ElasticResponse}
import models.ElasticServer
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test.{FakeApplication, FakeRequest}

import scala.concurrent.Future

object TemplatesControllerSpec extends Specification with Mockito with NoAuthController {

  def is =
    s2"""
    TemplatesController should                           ${step(play.api.Play.start(FakeApplication()))}
      return all templates                               $templates
      delete template                                    $delete
      require template name to delete                    $requireNameDelete
      create template                                    $create
      require template name to create                    $requireNameCreate
                                                         ${step(play.api.Play.stop(FakeApplication()))}
      """

  def templates = {
    val mockedClient = mock[ElasticClient]
    val mockedResponse = Json.parse(
      """
        |{
        |  "template_1": {
        |    "order": 0,
        |    "template": "somePattern_1*",
        |    "settings": {},
        |    "mappings": {},
        |    "aliases": {}
        |  },
        |  "template_2": {
        |    "order": 0,
        |    "template": "somePattern_2*",
        |    "settings": {},
        |    "mappings": {},
        |    "aliases": {}
        |  }
        |}
      """.stripMargin
    )
    val expectedResponse = Json.parse(
      """
        |[
        |  {
        |    "name": "template_1",
        |    "template": {
        |      "order": 0,
        |      "template": "somePattern_1*",
        |      "settings": {},
        |      "mappings": {},
        |      "aliases": {}
        |    }
        |  },
        |  {
        |    "name": "template_2",
        |    "template": {
        |      "order": 0,
        |      "template": "somePattern_2*",
        |      "settings": {},
        |      "mappings": {},
        |      "aliases": {}
        |    }
        |  }
        |]
      """.stripMargin
    )
    mockedClient.getTemplates(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, mockedResponse))
    val controller = new TemplatesController(auth) {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.templates()(FakeRequest().withBody(Json.obj("host" -> "somehost")))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }

  def delete = {
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |{"acknowledged":true}
      """.stripMargin
    )
    mockedClient.deleteTemplate("someTemplate", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new TemplatesController(auth) {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.delete()(FakeRequest().withBody(Json.obj("host" -> "somehost", "name" -> "someTemplate")))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }

  def requireNameDelete = {
    val controller = new TemplatesController(auth)
    val response = controller.delete()(FakeRequest().withBody(Json.obj("host" -> "somehost")))
    (status(response) mustEqual 400) and (contentAsJson(response) mustEqual Json.parse("{\"error\":\"Missing required parameter name\"}"))
  }

  def create = {
    val template = Json.parse(
      """
        |{
        |  "whatever": {}
        |}
      """.stripMargin)
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |{"acknowledged":true}
      """.stripMargin
    )
    mockedClient.createTemplate("someTemplate", template, ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new TemplatesController(auth) {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.create()(FakeRequest().withBody(Json.obj("host" -> "somehost", "name" -> "someTemplate", "template" -> template)))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }

  def requireNameCreate = {
    val controller = new TemplatesController(auth)
    val response = controller.create()(FakeRequest().withBody(Json.obj("host" -> "somehost")))
    (status(response) mustEqual 400) and (contentAsJson(response) mustEqual Json.parse("{\"error\":\"Missing required parameter name\"}"))
  }

  def requireNameTemplate = {
    val controller = new TemplatesController(auth)
    val response = controller.create()(FakeRequest().withBody(Json.obj("host" -> "somehost", "name" -> "any")))
    (status(response) mustEqual 400) and (contentAsJson(response) mustEqual Json.parse("{\"error\":\"Missing required parameter template\"}"))
  }


}
