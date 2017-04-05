package models.overview

import org.specs2.Specification
import play.api.libs.json.Json

object NodeSpec extends Specification {

  def is =
    s2"""
    Node should

      parse a >= 5.0 ES node $nodeInfo5
      parse a AWS nods       $awsNode
      """

  def nodeInfo5 = {
    val expected = Json.parse(
      """
        |{
        |  "id": "nodeId",
        |  "current_master": false,
        |  "name": "Solara",
        |  "host": "127.0.0.1",
        |  "ip": "127.0.0.1",
        |  "es_version": "2.1.0",
        |  "jvm_version": "1.8.0_72",
        |  "load_average": 3.17138671875,
        |  "available_processors": 8,
        |  "cpu_percent": 0,
        |  "master": true,
        |  "data": true,
        |  "coordinating": false,
        |  "ingest": false,
        |  "heap": {
        |    "used": 28420720,
        |    "committed": 259522560,
        |    "used_percent": 2,
        |    "max": 1037959168
        |  },
        |  "disk": {
        |    "total": 249804886016,
        |    "free": 41567444992,
        |    "used_percent": 84
        |  }
        |}
      """.stripMargin
    )
    val node = Node("nodeId", NodesInfo.nodeInfo5, NodeStats.nodeStats5, "otherId")
    node mustEqual expected
  }

  def awsNode = {
    val expected = Json.parse(
      """
        |{
        |  "id": "nodeId",
        |  "current_master": false,
        |  "name": "Solara",
        |  "host": null,
        |  "ip": null,
        |  "es_version": "2.1.0",
        |  "jvm_version": null,
        |  "load_average": 3.17138671875,
        |  "available_processors": 8,
        |  "cpu_percent": 0,
        |  "master": true,
        |  "data": true,
        |  "coordinating": false,
        |  "ingest": false,
        |  "heap": {
        |    "used": 28420720,
        |    "committed": 259522560,
        |    "used_percent": 2,
        |    "max": 1037959168
        |  },
        |  "disk": {
        |    "total": 249804886016,
        |    "free": 41567444992,
        |    "used_percent": 84
        |  }
        |}
      """.stripMargin
    )
    val node = Node("nodeId", NodesInfo.awsInfo, NodeStats.awsNodeStats5, "otherId")
    node mustEqual expected
  }

}
