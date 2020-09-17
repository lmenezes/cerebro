package models.repository

import org.specs2.Specification
import play.api.libs.json.Json

object RepositoriesSpec extends Specification {

  def is =
    s2"""
    Repositories should
        parse all repository info                  $repositories
        tolerate missing settings for repository   $missingSettings

      """

  def repositories = {
    val data = Json.parse(
      """
        |{
        |  "some_repo_with_settings": {
        |    "type": "s3",
        |    "settings": {
        |      "bucket": "bucket_name",
        |      "region": "us"
        |    }
        |  }
        |}
      """.stripMargin
    )
    Repositories(data) mustEqual Json.arr(
      Json.obj(
        "name" -> "some_repo_with_settings",
        "type" -> "s3",
        "settings" -> Json.obj(
          "bucket" -> "bucket_name",
          "region" -> "us"
        )
      )
    )
  }

  def missingSettings = {
    val data = Json.parse(
      """
        |{
        |  "some_repo_with_settings": {
        |    "type": "s3"
        |  }
        |}
      """.stripMargin
    )
    Repositories(data) mustEqual Json.arr(
      Json.obj(
        "name" -> "some_repo_with_settings",
        "type" -> "s3",
        "settings" -> Json.obj()
      )
    )
  }

}
