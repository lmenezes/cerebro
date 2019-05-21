package models

case class ElasticServer(host: Host, headers: Seq[(String, String)] = Seq.empty)
