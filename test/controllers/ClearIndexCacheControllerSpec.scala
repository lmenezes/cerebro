package controllers

import elastic.ElasticClient
import exceptions.MissingRequiredParamException
import models.CerebroRequest
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.FakeApplication

object ClearIndexCacheControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    ClearIndexCacheController should               ${step(play.api.Play.start(FakeApplication()))}

      clear cache for given indices                $clusterName
      should throw exception if indices is missing $missingIndices
                                                   ${step(play.api.Play.stop(FakeApplication()))}
      """

  val controller = new ClearIndexCacheController

  def clusterName = {
    val body = Json.obj("host" -> "somehost", "indices" -> "a,b,c")
    val client = mock[ElasticClient]
    controller.processElasticRequest(CerebroRequest(body), client)
    there was one(client).clearIndexCache("a,b,c", "somehost")
  }

  def missingIndices = {
    val body = Json.obj("host" -> "somehost")
    val client = mock[ElasticClient]
    controller.processElasticRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

}
