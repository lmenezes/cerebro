package controllers

import elastic.Success
import models.ElasticServer
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
        |  "indices": ["index1", "index2"],
        |  "nodes": ["Shriek", "Jimaine Szardos"]
        |}
      """.stripMargin
    )
    val healthResponse = Json.parse("""[{"cluster": "elasticsearch"}]""")
    val indicesResponse = Json.parse(
      """
        |[
        |  {"index":"index1"},
        |  {"index":"index2"}
        |]
      """.stripMargin
    )
    val nodesResponse = Json.parse(
      """
      |[
      |  {"name":"Shriek"},
      |  {"name":"Jimaine Szardos"}
      |]
      """.stripMargin
    )

    client.executeRequest("GET", "_cat/health?h=cluster&format=json", None, ElasticServer("somehost", None)) returns Future.successful(Success(200, healthResponse))
    client.executeRequest("GET", "_cat/nodes?format=json&h=name", None, ElasticServer("somehost", None)) returns Future.successful(Success(200, nodesResponse))
    client.executeRequest("GET", "_cat/indices?format=json&h=index", None, ElasticServer("somehost", None)) returns Future.successful(Success(200, indicesResponse))
    val response = route(application, FakeRequest(POST, "/cluster_changes").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 200, expectedResponse)
  }
}
