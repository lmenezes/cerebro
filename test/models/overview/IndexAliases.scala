package models.overview

import play.api.libs.json.Json

object IndexAliases {

  val aliases = Json.parse(
    """
      |{
      |  "fancyAlias": {}
      |}
    """.stripMargin
  )

}
