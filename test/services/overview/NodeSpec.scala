package services.overview

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
        |  "id": "rtOe",
        |  "current_master": true,
        |  "name": "rtOejLm",
        |  "ip": "127.0.0.1",
        |  "jvm_version": "1.8.0_92",
        |  "es_version": "5.3.0",
        |  "load_1m": "2.34",
        |  "cpu": "24",
        |  "master": true,
        |  "data": true,
        |  "coordinating": false,
        |  "ingest": true,
        |  "heap": {
        |    "current": "461.6mb",
        |    "percent": "23",
        |    "max": "1.9gb"
        |  },
        |  "disk": {
        |    "total": null,
        |    "avail": "114.5gb",
        |    "percent": null
        |  }
        |}
      """.stripMargin
    )
    val node = Node(NodesInfo.node5)
    node mustEqual expected
  }

  def awsNode = {
    val expected = Json.parse(
      """
        |{
        |  "id": "rtOe",
        |  "current_master": true,
        |  "name": "rtOejLm",
        |  "ip": null,
        |  "jvm_version": null,
        |  "es_version": "5.3.0",
        |  "load_1m": "2.34",
        |  "cpu": "24",
        |  "master": true,
        |  "data": true,
        |  "coordinating": false,
        |  "ingest": true,
        |  "heap": {
        |    "current": "461.6mb",
        |    "percent": "23",
        |    "max": "1.9gb"
        |  },
        |  "disk": {
        |    "total": null,
        |    "avail": "114.5gb",
        |    "percent": null
        |  }
        |}
      """.stripMargin
    )
    val node = Node(NodesInfo.awsInfo)
    node mustEqual expected
  }

}
