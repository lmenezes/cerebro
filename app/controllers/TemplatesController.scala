package controllers

import models.ElasticServer
import models.analysis.OpenIndices
import models.templates.Templates

import scala.concurrent.ExecutionContext.Implicits.global

class TemplatesController extends BaseController {

  def templates = process { (request, client) =>
    client.getTemplates(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Templates(response.body))
    }
  }

  def delete = process { (request, client) =>
    val name = request.get("name")
    client.deleteTemplate(name, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def create = process { (request, client) =>
    val name = request.get("name")
    val template = request.getObj("template")
    client.createTemplate(name, template, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
