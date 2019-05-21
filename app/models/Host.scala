package models

case class Host(name: String, authentication: Option[ESAuth] = None, headersWhitelist: Seq[String] = Seq.empty)
