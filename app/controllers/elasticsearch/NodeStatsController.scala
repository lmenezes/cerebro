package controllers.elasticsearch

import elastic.ElasticClient

class NodeStatsController extends ElasticsearchController {

  def index(nodes: String) = processRequest(ElasticClient.nodesStats(nodes, _))

}
