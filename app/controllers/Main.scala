package controllers

import elastic.ElasticClient
import scala.concurrent.ExecutionContext.Implicits.global

class Main extends BaseController {

  def processRequest = { request =>
    ElasticClient.main(request.host).map { response =>
      Status(response.status)(response.body)
    }
  }

}
