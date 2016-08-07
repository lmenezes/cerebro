package models.commons

import org.specs2.Specification
import play.api.libs.json.Json

object IndicesSpec extends Specification {

  def is =
    s2"""
    Indices should
        return all indices                  $indices

      """

  def indices = {
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
    Indices(data) mustEqual Json.arr("some_index", "some_other_index")
  }

}
