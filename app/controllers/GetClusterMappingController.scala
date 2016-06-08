package controllers


import models.{ClusterMapping, ElasticServer}

import scala.concurrent.ExecutionContext.Implicits.global

class GetClusterMappingController extends BaseController {

  def processRequest = (request, client) => client.getClusterMapping(ElasticServer(request.host, request.authentication)).map { response =>
    Ok(ClusterMapping(response.body))
  }

}
