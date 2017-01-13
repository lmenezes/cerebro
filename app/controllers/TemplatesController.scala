package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.{CerebroResponse, ElasticServer}
import models.templates.Templates

import scala.concurrent.ExecutionContext.Implicits.global

class TemplatesController @Inject()(val authentication: AuthenticationModule,
                                    client: ElasticClient) extends BaseController {

  def templates = process { request =>
    client.getTemplates(ElasticServer(request.host, request.authentication)).map { response =>
      CerebroResponse(response.status, Templates(response.body))
    }
  }

  def delete = process { request =>
    val name = request.get("name")
    client.deleteTemplate(name, ElasticServer(request.host, request.authentication)).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def create = process { request =>
    val name = request.get("name")
    val template = request.getObj("template")
    client.createTemplate(name, template, ElasticServer(request.host, request.authentication)).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

}
