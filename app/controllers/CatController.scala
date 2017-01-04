package controllers

import models.analysis.{IndexAnalyzers, IndexFields, OpenIndices, Tokens}
import models.ElasticServer

import scala.concurrent.ExecutionContext.Implicits.global

class CatController extends BaseController {

  def get = process { (request, client) =>
    val api = request.get("api")
    client.catRequest(api, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
