package controllers


import models.ClusterMapping
import scala.concurrent.ExecutionContext.Implicits.global

class GetClusterMappingController extends BaseController {

  def processRequest = (request, client) => client.getClusterMapping(request.host).map { response =>
    Ok(ClusterMapping(response.body))
  }

}
