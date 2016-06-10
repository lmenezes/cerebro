package controllers

import models.{Aliases, ElasticServer}

import scala.concurrent.ExecutionContext.Implicits.global

class GetAliasesController extends BaseController {

  def processRequest = (request, client) => {
    client.getAliases(ElasticServer(request.host, request.authentication)).map { aliases =>
      Status(aliases.status)(Aliases(aliases.body))
    }
  }

}
