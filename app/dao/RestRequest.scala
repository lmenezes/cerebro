package dao

import java.security.MessageDigest
import java.util.Date

import slick.jdbc.SQLiteProfile.api._
import slick.lifted.Tag

case class HashedRestRequest(path: String, method: String, body: String, username: String, createdAt: Long, md5: String)

case class RestRequest(path: String, method: String, body: String, username: String, createdAt: Date) {

  val md5 = MessageDigest.getInstance("MD5").digest(
    (path + method + body + username).getBytes
  ).map("%02x".format(_)).mkString

}

object RestRequest {

  def apply(request: HashedRestRequest): RestRequest = {
    RestRequest(request.path, request.method, request.body, request.username, new Date(request.createdAt))
  }

}

class RestRequests(tag: Tag) extends Table[HashedRestRequest](tag, "rest_requests") {

  def id = column[Int]("id", O.PrimaryKey, O.AutoInc)

  def username = column[String]("username")

  def path = column[String]("path")

  def method = column[String]("method")

  def body = column[String]("body")

  def md5 = column[String]("md5")

  def createdAt = column[Long]("created_at")

  def * = (path, method, body, username, createdAt, md5) <> (HashedRestRequest.tupled, HashedRestRequest.unapply)

}
