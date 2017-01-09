package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import models.{Aliases, ElasticServer}
import play.api.libs.json.JsArray

import scala.concurrent.ExecutionContext.Implicits.global

class AliasesController @Inject()(val authentication: AuthenticationModule) extends BaseController {

  def getAliases = process { (request, client) =>
    client.getAliases(ElasticServer(request.host, request.authentication)).map { aliases =>
      Status(aliases.status)(Aliases(aliases.body))
    }
  }

  def updateAliases = process { (request, client) =>
    val changes = request.getOptArray("changes").getOrElse(JsArray()).value
    client.updateAliases(changes, ElasticServer(request.host, request.authentication)).map { aliases =>
      Status(aliases.status)(aliases.body)
    }
  }

}
