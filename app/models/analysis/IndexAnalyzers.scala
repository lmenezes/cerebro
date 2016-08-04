package models.analysis

import play.api.libs.json._

object IndexAnalyzers {

  def apply(index: String, mapping: JsValue): JsArray = {
    val analyzers = (mapping \ index \ "settings" \ "index" \ "analysis" \ "analyzer").asOpt[JsObject]
    JsArray(analyzers.map(_.keys.toSeq).getOrElse(Seq()).map(JsString(_)))
  }

}
