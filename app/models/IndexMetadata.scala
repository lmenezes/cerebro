package models

import play.api.libs.json.{JsValue, Json}

object IndexMetadata {

  def apply(metadata: JsValue) = Json.obj(
    "mappings" -> (metadata \\ "mappings").head,
    "settings" -> (metadata \\ "settings").head
  )

}
