package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{Aliases, ElasticServer}
import play.api.libs.json.JsArray

import scala.concurrent.ExecutionContext.Implicits.global

class AliasesController @Inject()(val authentication: AuthenticationModule,
                                  client: ElasticClient) extends BaseController {

  def getAliases = process { request =>
    client.getAliases(ElasticServer(request.host, request.authentication)).map { aliases =>
      Status(aliases.status)(Aliases(aliases.body))
    }
  }

  def updateAliases = process { request =>
    val changes = request.getOptArray("changes").getOrElse(JsArray()).value
    client.updateAliases(changes, ElasticServer(request.host, request.authentication)).map { aliases =>
      Status(aliases.status)(aliases.body)
    }
  }

}
