package models.analysis

import org.specs2.Specification
import play.api.libs.json.Json

object IndexFieldsSpec extends Specification {

  def is =
    s2"""
    IndexField should
        should return only string fields                   $regularFields
        should return fields from all types                $multipleTypes FIXME < 7
        should return sub fields on multi fields fields    $multiFields
        should return properties of object fields          $objects

      """

  def regularFields = {
    val data = Json.parse(
      """
        |{
        |  "index_name": {
        |    "mappings": {
        |      "properties": {
        |        "regular_field": {
        |          "type": "string"
        |        },
        |        "regular_field_2": {
        |          "type": "string",
        |          "analyzer": "standard"
        |        },
        |        "ignored_field": {
        |          "type": "integer"
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    IndexFields("index_name", data) mustEqual Json.arr("regular_field", "regular_field_2")
  }

  def multipleTypes = {
    val data = Json.parse(
      """
        |{
        |  "index_name": {
        |    "mappings": {
        |      "type_1": {
        |        "properties": {
        |          "regular_field": {
        |            "type": "string"
        |          }
        |        }
        |      },
        |      "type_2": {
        |        "properties": {
        |          "regular_field_2": {
        |            "type": "string",
        |            "analyzer": "standard"
        |          }
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    IndexFields("index_name", data) mustEqual Json.arr("regular_field", "regular_field_2")
  }

  def multiFields = {
    val data = Json.parse(
      """
        |{
        |  "index_name": {
        |    "mappings": {
        |      "properties": {
        |        "multi_field": {
        |          "type": "string",
        |          "fields": {
        |            "sub_field": {
        |              "type": "string"
        |            },
        |            "ignored_sub_field": {
        |              "type": "integer"
        |            }
        |          }
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )

    IndexFields("index_name", data) mustEqual Json.arr("multi_field.sub_field", "multi_field")
  }

  def objects = {
    val data = Json.parse(
      """
        |{
        |  "index_name": {
        |    "mappings": {
        |      "properties": {
        |        "object_type": {
        |          "properties": {
        |            "first_level_property": {
        |              "properties": {
        |                "second_level_property": {
        |                  "type": "string"
        |                }
        |              }
        |            },
        |            "first_level_property_2": {
        |              "properties": {
        |                "second_level_property": {
        |                  "type": "string"
        |                }
        |              }
        |            }
        |          }
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    IndexFields("index_name", data) mustEqual Json.arr("object_type.first_level_property.second_level_property", "object_type.first_level_property_2.second_level_property")
  }

}
