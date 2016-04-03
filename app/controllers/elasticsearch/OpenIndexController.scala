package controllers.elasticsearch


import elastic.ElasticClient

class OpenIndexController extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.openIndex(request.get("indices"), request.host) }

}
