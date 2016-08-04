package controllers

import elastic.{ElasticClient, ElasticResponse}
import models.ElasticServer
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test.{FakeApplication, FakeRequest}

import scala.concurrent.Future

object AnalysisControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    AnalysisController should                            ${step(play.api.Play.start(FakeApplication()))}
      return open indices                                $indices
      return index analyzers                             $analyzers
      return index fields                                $fields
      analyze by field                                   $analyzeByField
      analyze by analyzer                                $analyzeByAnalyzer
                                                         ${step(play.api.Play.stop(FakeApplication()))}
      """

  def indices = {
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |[
        |  {"health":"green","status":"open","index":"index1","pri":"10","rep":"0","docs.count":"4330","docs.deleted":"10","store.size":"4.1mb","pri.store.size":"4.1mb"},
        |  {"health":"green","status":"open","index":"index2","pri":"10","rep":"0","docs.count":"1497203","docs.deleted":"5048","store.size":"860.9mb","pri.store.size":"860.9mb"}
        |]
      """.stripMargin
    )
    mockedClient.getIndices(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new AnalysisController {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.getIndices()(FakeRequest().withBody(Json.obj("host" -> "somehost")))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual Json.arr("index1", "index2"))
  }

  def analyzers = {
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |{
        |  "foo": {
        |    "settings": {
        |      "index": {
        |        "analysis": {
        |          "analyzer": {
        |            "foo_analyzer": {
        |              "filter": [
        |                "lowercase"
        |              ],
        |              "tokenizer": "standard"
        |            }
        |          }
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    mockedClient.getIndexSettings("foo", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new AnalysisController {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.getIndexAnalyzers()(FakeRequest().withBody(Json.obj("host" -> "somehost", "index" -> "foo")))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual Json.arr("foo_analyzer"))
  }

  def fields = {
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |{
        |  "foo": {
        |    "mappings": {
        |      "bar": {
        |        "dynamic": "false",
        |        "properties": {
        |          "name": {
        |            "type": "string",
        |            "index": "not_analyzed"
        |          }
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    mockedClient.getIndexMapping("foo", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new AnalysisController {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.getIndexFields()(FakeRequest().withBody(Json.obj("host" -> "somehost", "index" -> "foo")))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual Json.arr("name"))
  }

  def analyzeByAnalyzer = {
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |{
        |  "tokens": [
        |    {
        |      "token": "foobar",
        |      "start_offset": 0,
        |      "end_offset": 3,
        |      "type": "<ALPHANUM>",
        |      "position": 0
        |    }
        |  ]
        |}
      """.stripMargin
    )
    mockedClient.analyzeTextByAnalyzer("foo", "bar", "qux", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new AnalysisController {
      override val client: ElasticClient = mockedClient
    }
    val params = Json.obj("host" -> "somehost", "index" -> "foo", "analyzer" -> "bar", "text" -> "qux")
    val response = controller.analyzeByAnalyzer()(FakeRequest().withBody(params))
    val expected = Json.parse(
      """
        |[
        |  {
        |    "token": "foobar",
        |    "start_offset": 0,
        |    "end_offset": 3,
        |    "type": "<ALPHANUM>",
        |    "position": 0
        |  }
        |]
      """.stripMargin)
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expected)
  }

  def analyzeByField = {
    val mockedClient = mock[ElasticClient]
    val expectedResponse = Json.parse(
      """
        |{
        |  "tokens": [
        |    {
        |      "token": "foobar",
        |      "start_offset": 0,
        |      "end_offset": 3,
        |      "type": "<ALPHANUM>",
        |      "position": 0
        |    }
        |  ]
        |}
      """.stripMargin
    )
    mockedClient.analyzeTextByField("foo", "bar", "qux", ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, expectedResponse))
    val controller = new AnalysisController {
      override val client: ElasticClient = mockedClient
    }
    val params = Json.obj("host" -> "somehost", "index" -> "foo", "field" -> "bar", "text" -> "qux")
    val response = controller.analyzeByField()(FakeRequest().withBody(params))
    val expected = Json.parse(
      """
        |[
        |  {
        |    "token": "foobar",
        |    "start_offset": 0,
        |    "end_offset": 3,
        |    "type": "<ALPHANUM>",
        |    "position": 0
        |  }
        |]
      """.stripMargin)
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expected)
  }

}
