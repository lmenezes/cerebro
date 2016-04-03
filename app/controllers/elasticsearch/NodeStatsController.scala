package controllers.elasticsearch

import elastic.ElasticClient

class NodeStatsController extends ElasticsearchController {

  def index = processRequest { request => ElasticClient.nodesStats(request.get("node"), request.host) }

}
