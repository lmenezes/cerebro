package models.analysis

import org.specs2.Specification
import play.api.libs.json.Json

object OpenIndicesSpec extends Specification {

  def is =
    s2"""
    IndexAnalyzers should
        should return all analyzers                  $analyzers

      """

  def analyzers = {
    val data = Json.parse(
      """
        |[
        |  {
        |    "health": "yellow",
        |    "status": "open",
        |    "index": "some_index",
        |    "pri": "5",
        |    "rep": "1",
        |    "docs.count": "0",
        |    "docs.deleted": "0",
        |    "store.size": "795b",
        |    "pri.store.size": "795b"
        |  },
        |  {
        |    "health": null,
        |    "status": "close",
        |    "index": "some_other_index",
        |    "pri": null,
        |    "rep": null,
        |    "docs.count": null,
        |    "docs.deleted": null,
        |    "store.size": null,
        |    "pri.store.size": null
        |  }
        |]
      """.stripMargin
    )
    OpenIndices(data) mustEqual Json.arr("some_index")
  }

}
