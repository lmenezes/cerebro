package models.repository

import models.UnexpectedResponseFormatException
import play.api.libs.json.{JsArray, JsObject, JsValue, Json}

object Repositories {

  def apply(json: JsValue): JsValue = {
    json match {
      case JsObject(repositories) =>
        JsArray(
          repositories.map { case (name, info) =>
            Json.obj(
              "name" -> name,
              "type" -> (info \ "type").as[JsValue],
              "settings" -> (info \ "settings").asOpt[JsObject].getOrElse[JsObject](Json.obj())
            )
          }.toSeq
        )
      case _ => throw UnexpectedResponseFormatException(json)
    }
  }

}
