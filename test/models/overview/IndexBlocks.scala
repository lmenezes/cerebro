package models.overview

import play.api.libs.json.{JsObject, Json}

object IndexBlocks {

  val closed: JsObject = Json.parse(
    """
      |{
      |  "4": {
      |    "description": "index closed",
      |    "retryable": false,
      |    "levels": [
      |      "read",
      |      "write"
      |    ]
      |  }
      |}
    """.stripMargin
  ).as[JsObject]

}
