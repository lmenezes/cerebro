package models.analysis

import org.specs2.Specification
import play.api.libs.json.{JsNumber, JsString, Json}

object TokensSpec extends Specification {

  def is =
    s2"""
    Tokens should
        returns tokens as an array     $parse

      """

  def parse = {
    val data = Json.parse(
      """
        |{
        |  "tokens": [
        |    {
        |       "token": "foo",
        |       "position": 0,
        |       "start_offset": 0,
        |       "end_offset": 3
        |    }
        |  ]
        |}
      """.stripMargin
    )
    val expected = Json.arr(
      Json.obj(
        "token"        -> JsString("foo"),
        "position"     -> JsNumber(0),
        "start_offset" -> JsNumber(0),
        "end_offset"   -> JsNumber(3)
      )
    )
    Tokens(data) mustEqual expected
  }

}
