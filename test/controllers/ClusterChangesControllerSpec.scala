package controllers

import elastic.Success
import models.{ElasticServer, Host}
import play.api.libs.json.Json
import play.api.test.FakeRequest
import play.api.test.Helpers._

import scala.concurrent.Future

object ClusterChangesControllerSpec extends MockedServices {

  def is =
    s2"""
    ClusterChangesController should               ${step(play.api.Play.start(application))}
      return indices, nodes and cluster name      $get
                                                  ${step(play.api.Play.stop(application))}
      """

  def get = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "cluster_name": "elasticsearch",
        |  "indices": ["bar", "foo"],
        |  "nodes": ["foobar", "qux"]
        |}
      """.stripMargin
    )

    val aliasesResponse = Json.parse(
      """
        |{
        |  "bar": {
        |    "aliases": {}
        |  }
        |}
      """.stripMargin
    )

    val stateResponse = Json.parse(
      """
        |{
        |  "cluster_name": "elasticsearch",
        |  "blocks" : {
        |    "indices" : {
        |      "foo" : {
        |        "4" : {
        |          "description" : "index closed",
        |          "retryable" : false,
        |          "levels" : [ "read", "write" ]
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )

    val nodesResponse = Json.parse(
      """
        |{
        |  "_nodes": {
        |    "total": 1,
        |    "successful": 1,
        |    "failed": 0
        |  },
        |  "cluster_name": "elasticsearch",
        |  "nodes": {
        |    "zV4lLJgjQ6y-BkIQI0IChg": {
        |      "name": "foobar",
        |      "transport_address": "192.1.1.0:9300",
        |      "host": "192.1.1.0",
        |      "ip": "192.1.1.0",
        |      "version": "5.4.0",
        |      "build_hash": "780f8c4",
        |      "roles": [
        |        "master",
        |        "data",
        |        "ingest"
        |      ],
        |      "attributes": {
        |      },
        |      "transport": {
        |        "bound_address": [
        |          "[::]:9300"
        |        ],
        |        "publish_address": "10.12.32.25:9300",
        |        "profiles": {
        |        }
        |      }
        |    },
        |    "z4LJgjQ6y-BkIQI0IChg": {
        |      "name": "qux",
        |      "transport_address": "192.1.1.0:9300",
        |      "host": "192.1.1.0",
        |      "ip": "192.1.1.0",
        |      "version": "5.4.0",
        |      "build_hash": "780f8c4",
        |      "roles": [
        |        "master",
        |        "data",
        |        "ingest"
        |      ],
        |      "attributes": {
        |      },
        |      "transport": {
        |        "bound_address": [
        |          "[::]:9300"
        |        ],
        |        "publish_address": "10.12.32.25:9300",
        |        "profiles": {
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    client.executeRequest("GET", "_cluster/state/blocks", None, ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, stateResponse))
    client.executeRequest("GET", "_nodes/transport", None, ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, nodesResponse))
    client.executeRequest("GET", "_aliases", None, ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, aliasesResponse))
    val response = route(application, FakeRequest(POST, "/cluster_changes").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 200, expectedResponse)
  }
}
