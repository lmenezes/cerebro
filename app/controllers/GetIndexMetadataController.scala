package controllers


import models.{ElasticServer, IndexMetadata}

import scala.concurrent.ExecutionContext.Implicits.global

class GetIndexMetadataController extends BaseController {

  def processRequest = (request, client) => client.getIndexMetadata(request.get("index"), ElasticServer(request.host, request.authentication)).map { response =>
    Ok(IndexMetadata(response.body))
  }

}
