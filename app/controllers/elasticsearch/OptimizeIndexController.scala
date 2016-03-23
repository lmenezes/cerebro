package controllers.elasticsearch

import elastic.ElasticClient
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext.Implicits.global

class OptimizeIndexController extends ElasticsearchController {

  def index(indices: String) = processRequest(ElasticClient.optimizeIndex(indices, _))

}
