package controllers

import elastic.{ElasticResponse, Success}
import models.{ElasticServer, Host}
import play.api.libs.json.Json
import play.api.test.FakeRequest
import play.api.test.Helpers._

import scala.concurrent.Future

object AnalysisControllerSpec extends MockedServices {

  def is =
    s2"""
    AnalysisController should                            ${step(play.api.Play.start(application))}
      return open indices                                $indices
      return index analyzers                             $analyzers
      return index fields                                $fields
      analyze by field                                   $analyzeByField
      analyze by analyzer                                $analyzeByAnalyzer
                                                         ${step(play.api.Play.stop(application))}
      """

  def indices = {
    val expectedResponse = Json.parse(
      """
        |[
        |  {"health":"green","status":"open","index":"index1","pri":"10","rep":"0","docs.count":"4330","docs.deleted":"10","store.size":"4.1mb","pri.store.size":"4.1mb"},
        |  {"health":"green","status":"open","index":"index2","pri":"10","rep":"0","docs.count":"1497203","docs.deleted":"5048","store.size":"860.9mb","pri.store.size":"860.9mb"}
        |]
      """.stripMargin
    )
    client.getIndices(ElasticServer(Host("somehost"))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/analysis/indices").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 200, Json.arr("index1", "index2"))
  }

  def analyzers = {
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
    client.getIndexSettings("foo", ElasticServer(Host("somehost"))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/analysis/analyzers").withBody(Json.obj("host" -> "somehost", "index" -> "foo"))).get
    ensure(response, 200, Json.arr("foo_analyzer"))
  }

  def fields = {
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
    client.getIndexMapping("foo", ElasticServer(Host("somehost"))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/analysis/fields").withBody(Json.obj("host" -> "somehost", "index" -> "foo"))).get
    ensure(response, 200, Json.arr("name"))
  }

  def analyzeByAnalyzer = {
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
    client.analyzeTextByAnalyzer("foo", "bar", "qux", ElasticServer(Host("somehost"))) returns Future.successful(Success(200, expectedResponse))
    val params = Json.obj("host" -> "somehost", "index" -> "foo", "analyzer" -> "bar", "text" -> "qux")
    val response = route(application, FakeRequest(POST, "/analysis/analyze/analyzer").withBody(params)).get
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
    ensure(response, 200, expected)
  }

  def analyzeByField = {
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
    client.analyzeTextByField("foo", "bar", "qux", ElasticServer(Host("somehost"))) returns Future.successful(Success(200, expectedResponse))
    val params = Json.obj("host" -> "somehost", "index" -> "foo", "field" -> "bar", "text" -> "qux")
    val response = route(application, FakeRequest(POST, "/analysis/analyze/field").withBody(params)).get
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
    ensure(response, 200, expected)
  }

}
