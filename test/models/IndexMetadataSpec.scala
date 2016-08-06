package models

import org.specs2.Specification
import play.api.libs.json.Json


object IndexMetadataSpec extends Specification {

  def is =
    s2"""
    IndexMetadata should
        should extract mappings and settings from metadata          $parse

      """


  def parse = {
    val data = Json.parse(
      """
        |{
        |  "cluster_name": "elasticsearch",
        |  "metadata": {
        |    "cluster_uuid": "_na_",
        |    "templates": {},
        |    "indices": {
        |      "index_name": {
        |        "state": "open",
        |        "settings": {
        |          "some_settings": {
        |
        |          }
        |        },
        |        "mappings": {
        |          "some_mappings": {
        |
        |          }
        |        },
        |        "aliases": [
        |          "alias_1",
        |          "alias_2"
        |        ]
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    IndexMetadata(data) mustEqual Json.obj(
      "mappings" -> Json.obj("some_mappings" -> Json.obj()),
      "settings" -> Json.obj("some_settings" -> Json.obj())
    )
  }

}
