package models.analysis

import play.api.libs.json._

object IndexFields {

  def apply(index: String, data: JsValue) = {
    val docTypes = (data \ index \ "mappings").as[JsObject].keys
    val fields = docTypes.flatMap { docType =>
      extractProperties((data \ index \ "mappings" \ docType \ "properties").as[JsValue])
    }.toSeq
    JsArray(fields.map(JsString(_)))
  }

  def extractProperties(data: JsValue): Seq[String] = {
    data match {
      case obj: JsObject =>
        obj.keys.collect {
          case p if (data \ p \ "properties").asOpt[JsObject].isDefined =>
            extractProperties((data \ p \ "properties").as[JsValue]).map(s"$p.".concat(_))

          case p if (data \ p \ "fields").asOpt[JsObject].isDefined =>
            val fields = (data \ p \ "fields").as[JsObject].keys.collect {
              case field if (data \ p \ "fields" \ field \ "type").asOpt[String].exists(_.equals("string")) =>
                s"$p.$field"
            }.toSeq
            if ((data \ p \ "type").asOpt[String].exists(_.equals("string"))) {
              fields :+ p
            } else {
              fields
            }

          case p if (data \ p \ "type").asOpt[String].exists(_.equals("string")) =>
            Seq(p)
        }.flatten.toSeq
      case _ => Seq()
    }
  }

}
