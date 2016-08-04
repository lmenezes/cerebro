package models.analysis

import org.specs2.Specification
import play.api.libs.json.Json

object IndexAnalyzersSpec extends Specification {

  def is =
    s2"""
    IndexAnalyzers should
        should return all analyzers                  $analyzers

      """

  def analyzers = {
    val data = Json.parse(
      """
        |{
        |  "index_name": {
        |    "settings": {
        |      "index": {
        |        "analysis": {
        |          "filter": {},
        |          "analyzer": {
        |            "some_analyzer": {
        |              "filter": [
        |                "lowercase"
        |              ],
        |              "tokenizer": "whitespace"
        |            },
        |            "other_analyzer": {
        |              "filter": [
        |                "lowercase"
        |              ],
        |              "tokenizer": "keyword"
        |            }
        |          }
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    IndexAnalyzers("index_name", data) mustEqual Json.arr("some_analyzer", "other_analyzer")
  }

}
