package controllers

import elastic.Success
import models.{ElasticServer, Host}
import play.api.libs.json.Json
import play.api.test.FakeRequest
import play.api.test.Helpers._

import scala.concurrent.Future

object TemplatesControllerSpec extends MockedServices {

  def is =
    s2"""
    TemplatesController should                           ${step(play.api.Play.start(application))}
      return all templates                               $templates
      delete template                                    $delete
      require template name to delete                    $requireNameDelete
      create template                                    $create
      require template name to create                    $requireNameCreate
                                                         ${step(play.api.Play.stop(application))}
      """

  def templates = {
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
    client.getTemplates(ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, mockedResponse))
    val response = route(application, FakeRequest(POST, "/templates").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 200, expectedResponse)
  }

  def delete = {
    val expectedResponse = Json.parse(
      """
        |{"acknowledged":true}
      """.stripMargin
    )
    client.deleteTemplate("someTemplate", ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/templates/delete").withBody(Json.obj("host" -> "somehost", "name" -> "someTemplate"))).get
    ensure(response, 200, expectedResponse)
  }

  def requireNameDelete = {
    val response = route(application, FakeRequest(POST, "/templates/delete").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 400, Json.parse("{\"error\":\"Missing required parameter name\"}"))
  }

  def create = {
    val template = Json.parse(
      """
        |{
        |  "whatever": {}
        |}
      """.stripMargin)
    val expectedResponse = Json.parse(
      """
        |{"acknowledged":true}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "name" -> "someTemplate", "template" -> template)
    client.createTemplate("someTemplate", template, ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/templates/create").withBody(body)).get
    ensure(response, 200, expectedResponse)
  }

  def requireNameCreate = {
    val body = Json.obj("host" -> "somehost")
    val response = route(application, FakeRequest(POST, "/templates/create").withBody(body)).get
    ensure(response, 400, Json.parse("{\"error\":\"Missing required parameter name\"}"))
  }

  def requireNameTemplate = {
    val body = Json.obj("host" -> "somehost", "name" -> "any")
    val response = route(application, FakeRequest(POST, "/templates/create").withBody(body)).get
    ensure(response, 400, Json.parse("{\"error\":\"Missing required parameter template\"}"))
  }

}
