package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import models.ElasticServer
import models.analysis.{IndexAnalyzers, IndexFields, OpenIndices, Tokens}

import scala.concurrent.ExecutionContext.Implicits.global

class AnalysisController @Inject()(val authentication: AuthenticationModule,
                                   client: ElasticClient) extends BaseController {

  def getIndices = process { request =>
    client.getIndices(ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(OpenIndices(response.body))
    }
  }

  def getIndexAnalyzers = process { request =>
    val index = request.get("index")
    client.getIndexSettings(index, ElasticServer(request.host, request.authentication)).map { response =>
       Status(response.status)(IndexAnalyzers(index, response.body))
    }
  }

  def getIndexFields = process { request =>
    val index = request.get("index")
    client.getIndexMapping(index, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(IndexFields(index, response.body))
    }
  }

  def analyzeByField = process { request =>
    val index = request.get("index")
    val field = request.get("field")
    val text = request.get("text")
    client.analyzeTextByField(index, field, text, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Tokens(response.body))
    }
  }

  def analyzeByAnalyzer = process { request =>
    val index = request.get("index")
    val analyzer = request.get("analyzer")
    val text = request.get("text")
    client.analyzeTextByAnalyzer(index, analyzer, text, ElasticServer(request.host, request.authentication)).map { response =>
      Status(response.status)(Tokens(response.body))
    }
  }

}
