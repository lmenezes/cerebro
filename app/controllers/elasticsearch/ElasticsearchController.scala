package controllers.elasticsearch

import elastic.ElasticResponse
import play.api.Logger
import play.api.mvc.{Action, Controller}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

trait ElasticsearchController extends Controller {

  protected val logger = Logger("elastic")

  def processRequest(f: (String => Future[ElasticResponse])) = Action.async {
    request =>
      val host = request.queryString.getOrElse("host", Seq("http://localhost:9200")).head
      try {
        val response = f(host)
        response.map { r =>
          Status(r.status)(r.body)
        }
      } catch {
        case _ => Future.successful(Status(500)(s"Cannot connect to $host"))
      }
  }

}
