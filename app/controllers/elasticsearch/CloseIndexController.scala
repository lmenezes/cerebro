package controllers.elasticsearch


import elastic.ElasticClient

class CloseIndexController extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.closeIndex(request.get("indices"), request.host) }

}
