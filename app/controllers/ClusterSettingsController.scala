package controllers

import models.ElasticServer
import scala.concurrent.ExecutionContext.Implicits.global

class ClusterSettingsController extends BaseController {

  def getSettings = process { (request, client) =>
    client.getClusterSettings(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

  def save = process { (request, client) =>
    val settings = request.getObj("settings")
    client.saveClusterSettings(settings, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(response.body)
    }
  }

}
