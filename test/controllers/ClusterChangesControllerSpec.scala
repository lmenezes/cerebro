package controllers

import controllers.AnalysisControllerSpec.application
import elastic.{ElasticResponse, Success}
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
    val mainResponse = Json.parse("""{"cluster_name": "elasticsearch"}""")
    val indicesResponse = Json.parse(
      """
        |[
        |  {"health":"green","status":"open","index":"index1","pri":"10","rep":"0","docs.count":"4330","docs.deleted":"10","store.size":"4.1mb","pri.store.size":"4.1mb"},
        |  {"health":"green","status":"closed","index":"index2","pri":"10","rep":"0","docs.count":"1497203","docs.deleted":"5048","store.size":"860.9mb","pri.store.size":"860.9mb"}
        |]
      """.stripMargin
    )
    val nodesResponse = Json.parse(
      """
      |[
      |  {"host":"127.0.0.1","ip":"127.0.0.1","name":"Shriek"},
      |  {"host":"127.0.0.1","ip":"127.0.0.1","name":"Jimaine Szardos"}
      |]
      """.stripMargin
    )
    client.main(ElasticServer("somehost", None)) returns Future.successful(Success(200, mainResponse))
    client.getNodes(ElasticServer("somehost", None)) returns Future.successful(Success(200, nodesResponse))
    client.getIndices(ElasticServer("somehost", None)) returns Future.successful(Success(200, indicesResponse))
    val response = route(application, FakeRequest(POST, "/cluster_changes").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 200, expectedResponse)
  }
}
