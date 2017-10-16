package models.overview

import play.api.libs.json.Json

object ClusterDisabledAllocation extends ClusterWithData {

  override val clusterSettings = Json.parse(
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
