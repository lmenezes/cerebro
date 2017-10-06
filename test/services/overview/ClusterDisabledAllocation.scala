package services.overview

import play.api.libs.json.Json

object ClusterDisabledAllocation extends ClusterWithData {

  override val settings = Json.parse(
    """
      |{
      |  "persistent" : { },
      |  "transient" : {
      |    "cluster" : {
      |      "routing" : {
      |        "allocation" : {
      |          "enable" : "none"
      |        }
      |      }
      |    }
      |  }
      |}
    """.stripMargin
  )

}
