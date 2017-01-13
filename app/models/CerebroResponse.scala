package models

import play.api.libs.json.{JsValue, Json}
import play.api.mvc.Results._

object CerebroResponse {

  def apply(status: Int, body: JsValue) = {
    Ok(
      Json.obj(
        "status" -> status,
        "body" -> body
      )
    )
  }

}
