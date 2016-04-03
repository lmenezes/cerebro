package controllers.elasticsearch

import elastic.ElasticClient
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext.Implicits.global

class OptimizeIndexController extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.optimizeIndex(request.get("indices"), request.host) }

}
