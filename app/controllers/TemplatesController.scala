package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error, Success}
import models.templates.Templates
import models.{CerebroResponse, Hosts}

import scala.concurrent.ExecutionContext.Implicits.global

class TemplatesController @Inject()(val authentication: AuthenticationModule,
                                    val hosts: Hosts,
                                    client: ElasticClient) extends BaseController {

  def templates = process { request =>
    client.getTemplates(request.target).map {
      case Success(status, templates) => CerebroResponse(status, Templates(templates))
      case Error(status, error) => CerebroResponse(status, error)
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
