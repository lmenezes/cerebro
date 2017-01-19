package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{Aliases, CerebroResponse}
import play.api.libs.json.JsArray

import scala.concurrent.ExecutionContext.Implicits.global

class AliasesController @Inject()(val authentication: AuthenticationModule,
                                  client: ElasticClient) extends BaseController {

  def getAliases = process { request =>
    client.getAliases(request.target).map { aliases =>
      CerebroResponse(aliases.status, Aliases(aliases.body))
    }
  }

  def updateAliases = process { request =>
    val changes = request.getOptArray("changes").getOrElse(JsArray()).value
    client.updateAliases(changes, request.target).map { aliases =>
      CerebroResponse(aliases.status, aliases.body)
    }
  }

}
