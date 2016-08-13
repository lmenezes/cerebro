package models.commons

import org.specs2.Specification
import play.api.libs.json.Json

object NodesSpec extends Specification {

  def is =
    s2"""
    Nodes should
        return all nodes                  $nodes

      """

  def nodes = {
    val data = Json.parse(
      """
        |[
        |  {
        |    "host": "12.8.17.5",
        |    "ip": "12.8.17.5",
        |    "heap.percent": "8",
        |    "ram.percent": "95",
        |    "load": "0.19",
        |    "node.role": "d",
        |    "master": "*",
        |    "name": "Node 1"
        |  },
        |  {
        |    "host": "12.8.17.7",
        |    "ip": "12.8.17.7",
        |    "heap.percent": "8",
        |    "ram.percent": "95",
        |    "load": "0.19",
        |    "node.role": "d",
        |    "master": "*",
        |    "name": "Node 2"
        |  }
        |]
      """.stripMargin
    )
    Nodes(data) mustEqual Json.arr("Node 1", "Node 2")
  }

}
