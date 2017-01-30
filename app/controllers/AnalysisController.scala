package controllers

import javax.inject.Inject

import controllers.auth.AuthenticationModule
import elastic.{ElasticClient, Error, Success}
import models.analysis.{IndexAnalyzers, IndexFields, OpenIndices, Tokens}
import models.{CerebroResponse, Hosts}

import scala.concurrent.ExecutionContext.Implicits.global

class AnalysisController @Inject()(val authentication: AuthenticationModule,
                                   val hosts: Hosts,
                                   client: ElasticClient) extends BaseController {

  def getIndices = process { request =>
    client.getIndices(request.target).map {
      case Success(status, indices) => CerebroResponse(status, OpenIndices(indices))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

  def getIndexAnalyzers = process { request =>
    val index = request.get("index")
    client.getIndexSettings(index, request.target).map {
      case Success(status, settings) => CerebroResponse(status, IndexAnalyzers(index, settings))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

  def getIndexFields = process { request =>
    val index = request.get("index")
    client.getIndexMapping(index, request.target).map {
      case Success(status, mapping) => CerebroResponse(status, IndexFields(index, mapping))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

  def analyzeByField = process { request =>
    val index = request.get("index")
    val field = request.get("field")
    val text = request.get("text")
    client.analyzeTextByField(index, field, text, request.target).map {
      case Success(status, tokens) => CerebroResponse(status, Tokens(tokens))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

  def analyzeByAnalyzer = process { request =>
    val index = request.get("index")
    val analyzer = request.get("analyzer")
    val text = request.get("text")
    client.analyzeTextByAnalyzer(index, analyzer, text, request.target).map {
      case Success(status, tokens) => CerebroResponse(status, Tokens(tokens))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

}
