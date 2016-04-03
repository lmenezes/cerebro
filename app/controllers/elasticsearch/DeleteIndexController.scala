package controllers.elasticsearch


import elastic.ElasticClient

class DeleteIndexController extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.deleteIndex(request.get("indices"), request.host) }

}
