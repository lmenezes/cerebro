package models.snapshot

import play.api.libs.json.{JsArray, JsObject, JsValue}

object Snapshots {

  def apply(json: JsValue): JsValue = {
    json match {
      case snapshots: JsObject => (snapshots \ "snapshots").as[JsArray]
      case _ => JsArray()
    }
  }

}
