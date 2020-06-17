package models.nodes

import models.commons.NodeInfoData
import models.overview.NodeSpec.noAttributesNode
import org.specs2.Specification
import play.api.libs.json.Json

object NodeSpec extends Specification {

  def is =
    s2"""
    Node should

      parse a >= 5.0 ES node           $nodeInfo5
      parse a AWS node                 $awsNode
      parse a node without attributes  $noAttributesNode
      """

  def nodeInfo5 = {
    val expected = Json.parse(
      """
        |{
        |  "coordinating": false,
        |  "cpu": {
        |    "load": 1.82763671875,
        |    "os": 3,
        |    "process": 2
        |  },
        |  "current_master": true,
        |  "data": true,
        |  "disk": {
        |    "available": 77180944384,
        |    "percent": 69,
        |    "total": 249263407104
        |  },
        |  "heap": {
        |    "max": "1.9gb",
        |    "percent": 11,
        |    "used": "236.1mb"
        |  },
        |  "id": "nodeId",
        |  "ingest": true,
        |  "jvm": "1.8.0_131",
        |  "master": true,
        |  "name": "-qkZcMt",
        |  "uptime": 109228,
        |  "version": "5.1.1",
        |  "host": "127.0.0.1",
        |  "attributes": {
        |    "aws_availability_zone": "eu-west-1c",
        |    "node_type": "warm"
        |  }
        |}
      """.stripMargin
    )
    val node = Node("nodeId", true, NodeInfoData.nodeInfo5, NodeStats.nodeStats5)
    node mustEqual expected
  }

  def awsNode = {
    val expected = Json.parse(
      """
        |{
        |  "coordinating": false,
        |  "cpu": {
        |    "load": 0.02,
        |    "os": 0,
        |    "process": 0
        |  },
        |  "current_master": true,
        |  "data": true,
        |  "disk": {
        |    "available": 8744493056,
        |    "percent": 16,
        |    "total": 10434699264
        |  },
        |  "heap": {
        |    "max": "1.9gb",
        |    "percent": 30,
        |    "used": "629.2mb"
        |  },
        |  "id": "nodeId",
        |  "ingest": true,
        |  "jvm": null,
        |  "master": true,
        |  "name": "007ywNv",
        |  "uptime": 492790575,
        |  "version": "5.1.1",
        |  "host": null,
        |  "attributes": {
        |    "aws_availability_zone": "eu-west-1c",
        |    "node_type": "warm"
        |  }
        |}
      """.stripMargin
    )
    val node = Node("nodeId", true, NodeInfoData.awsInfo, NodeStats.awsNodeStats5)
    node mustEqual expected
  }

  def noAttributesNode = {
    val expected = Json.parse(
      """
        |{
        |  "coordinating": false,
        |  "cpu": {
        |    "load": 0.02,
        |    "os": 0,
        |    "process": 0
        |  },
        |  "current_master": true,
        |  "data": true,
        |  "disk": {
        |    "available": 8744493056,
        |    "percent": 16,
        |    "total": 10434699264
        |  },
        |  "heap": {
        |    "max": "1.9gb",
        |    "percent": 30,
        |    "used": "629.2mb"
        |  },
        |  "id": "nodeId",
        |  "ingest": true,
        |  "jvm": null,
        |  "master": true,
        |  "name": "007ywNv",
        |  "uptime": 492790575,
        |  "version": "5.1.1",
        |  "host": null,
        |  "attributes": {
        |  }
        |}
      """.stripMargin
    )
    val node = Node("nodeId", true, NodeInfoData.noAttributesNode, NodeStats.awsNodeStats5)
    node mustEqual expected
  }

}
