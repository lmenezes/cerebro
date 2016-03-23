package elastic

import play.api.libs.json.JsValue
import play.api.libs.ws.WSResponse

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

case class ElasticResponse(status: Int, body: JsValue)

object ElasticResponse {

  def apply(response: Future[WSResponse]): Future[ElasticResponse] = response.map {
    r => ElasticResponse(r.status, r.json)
  }

}
