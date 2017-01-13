package models

case class Cluster(host: String, authentication: Option[ESAuth])
