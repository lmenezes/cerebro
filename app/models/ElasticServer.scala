package models

case class ElasticServer(host: String, authentication: Option[ESAuth] = None)
