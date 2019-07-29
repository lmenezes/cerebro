package models.overview

import play.api.libs.json.{JsBoolean, JsString, Json}

object ClosedIndex {

  def apply(name: String) =
    Json.obj(
      "name" -> JsString(name),
      "closed" -> JsBoolean(true),
      "special" -> JsBoolean(name.startsWith("."))
    )

}
