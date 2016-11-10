package models.snapshot

import play.api.libs.json._

object Repositories {

  def apply(json: JsValue): JsValue = {
    json match {
      case JsObject(repos) => JsArray(repos.keys.map(JsString(_)).toSeq)
      case _ => JsArray()
    }
  }

}
