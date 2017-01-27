package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.templates.Templates
import models.{CerebroResponse, Hosts}

import scala.concurrent.ExecutionContext.Implicits.global

class TemplatesController @Inject()(val authentication: AuthenticationModule,
                                    val hosts: Hosts,
                                    client: ElasticClient) extends BaseController {

  def templates = process { request =>
    client.getTemplates(request.target).map { response =>
      CerebroResponse(response.status, Templates(response.body))
    }
  }

  def delete = process { request =>
    val name = request.get("name")
    client.deleteTemplate(name, request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

  def create = process { request =>
    val name = request.get("name")
    val template = request.getObj("template")
    client.createTemplate(name, template, request.target).map { response =>
      CerebroResponse(response.status, response.body)
    }
  }

}
