package models.commons

import play.api.libs.json.{JsObject, JsValue, Json}

trait NodeInfo {

  private val InternalNodeAttributes = Seq(
    "ml.machine_memory",
    "xpack.installed",
    "transform.node",
    "ml.max_open_jobs"
  )

  def attrs(info: JsValue) = {
    val map =
      (info \ "attributes").asOpt[JsObject].map(_.value.filterNot {
        case (attr, _) => InternalNodeAttributes.contains(attr)
      }).getOrElse(Map())

    JsObject(map.toSeq)
  }

}
