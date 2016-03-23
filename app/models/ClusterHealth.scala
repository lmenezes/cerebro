package models

import play.api.libs.json.{JsObject, JsString, JsValue}

class ClusterHealth(data: JsValue) {

  def json() = {
    JsObject(Seq(
      "cluster_name"                     -> (data \ "cluster_name").as[JsString],
      "status"                           -> (data \ "status").as[JsString],
      "number_of_nodes"                  -> (data \ "number_of_nodes").as[JsString],
      "active_primary_shards"            -> (data \ "active_primary_shards").as[JsString],
      "active_shards"                    -> (data \ "active_shards").as[JsString],
      "relocating_shards"                -> (data \ "relocating_shards").as[JsString],
      "initializing_shards"              -> (data \ "initializing_shards").as[JsString],
      "unassigned_shards"                -> (data \ "unassigned_shards").as[JsString],
      "delayed_unassigned_shards"        -> (data \ "delayed_unassigned_shards").as[JsString],
      "number_of_pending_tasks"          -> (data \ "number_of_pending_tasks").as[JsString],
      "number_of_in_flight_fetch"        -> (data \ "number_of_in_flight_fetch").as[JsString],
      "task_max_waiting_in_queue_millis" -> (data \ "task_max_waiting_in_queue_millis").as[JsString],
      "active_shards_percent_as_number"  -> (data \ "active_shards_percent_as_number").as[JsString]
    ))
  }

}
