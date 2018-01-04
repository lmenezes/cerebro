package models.overview

import play.api.libs.json.Json

object IndexStats {


  val stats = Json.parse(
    """
      |{
      |  "primaries": {
      |    "docs": {
      |      "count": 62064,
      |      "deleted": 0
      |    },
      |    "store": {
      |      "size_in_bytes": 163291998
      |    }
      |  },
      |  "total": {
      |    "docs": {
      |      "count": 124128,
      |      "deleted": 0
      |    },
      |    "store": {
      |      "size_in_bytes": 326583996
      |    }
      |  }
      |}
    """.stripMargin
  )

}
