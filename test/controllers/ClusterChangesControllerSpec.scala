package controllers

import elastic.{ElasticClient, ElasticResponse}
import models.ElasticServer
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.Helpers._
import play.api.test.{FakeApplication, FakeRequest}

import scala.concurrent.Future

object ClusterChangesControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    ClusterChangesController should               ${step(play.api.Play.start(FakeApplication()))}
      return indices, nodes and cluster name      $get
                                                  ${step(play.api.Play.stop(FakeApplication()))}
      """

  def get = {
    val mockedClient = mock[ElasticClient]
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
    mockedClient.main(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, mainResponse))
    mockedClient.getNodes(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, nodesResponse))
    mockedClient.getIndices(ElasticServer("somehost", None)) returns Future.successful(ElasticResponse(200, indicesResponse))
    val controller = new ClusterChangesController {
      override val client: ElasticClient = mockedClient
    }
    val response = controller.get()(FakeRequest().withBody(Json.obj("host" -> "somehost")))
    (status(response) mustEqual 200) and (contentAsJson(response) mustEqual expectedResponse)
  }
}
