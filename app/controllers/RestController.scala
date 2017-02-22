package controllers

import java.sql.Date
import javax.inject.Inject

import controllers.auth.AuthenticationModule
import dao.{RestHistoryDAO, RestRequest}
import elastic.{ElasticClient, Error, Success}
import models.{CerebroResponse, ClusterMapping, Hosts}
import play.api.libs.json.{JsArray, Json}

import scala.concurrent.ExecutionContext.Implicits.global

class RestController @Inject()(val authentication: AuthenticationModule,
                               val hosts: Hosts,
                               client: ElasticClient,
                               restHistoryDAO: RestHistoryDAO) extends BaseController {

  def request = process { request =>
    val method = request.get("method")
    val path = request.get("path")
    val body = request.getObjOpt("data")
    client.executeRequest(method, path, body, request.target).map {
      case s: Success =>
        val bodyAsString = body.map(_.toString).getOrElse("{}")
        val username = request.user.map(_.name).getOrElse("")
        restHistoryDAO.save(RestRequest(path, method, bodyAsString, username, new Date(System.currentTimeMillis)))
        CerebroResponse(s.status, s.body)

      case e: Error => CerebroResponse(e.status, e.body)
    }
  }

  def index = process { request =>
    client.getClusterMapping(request.target).map {
      case Success(status, body) => CerebroResponse(status, ClusterMapping(body))
      case Error(status, error) => CerebroResponse(status, error)
    }
  }

}
