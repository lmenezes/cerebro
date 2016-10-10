package controllers

import models.ElasticServer
import scala.concurrent.ExecutionContext.Implicits.global

class IndexSettingsController extends BaseController {

  def get = process { (request, client) =>
    client.getIndexSettingsFlat(request.get("index"), ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def update = process { (request, client) =>
    val index = request.get("index")
    val settings = request.getObj("settings")
    client.updateIndexSettings(index, settings, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
