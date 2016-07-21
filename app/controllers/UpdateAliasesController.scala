package controllers

import models.ElasticServer
import play.api.libs.json.JsArray

import scala.concurrent.ExecutionContext.Implicits.global

class UpdateAliasesController extends BaseController {

  def execute = process { (request, client) =>
    val changes = request.getOptArray("changes").getOrElse(JsArray()).value
    client.updateAliases(changes, ElasticServer(request.host, request.authentication)).map { aliases =>
      Status(aliases.status)(aliases.body)
    }
  }

}
