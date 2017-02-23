package dao

import java.sql.Date

import org.specs2.Specification
import org.specs2.concurrent.ExecutionEnv
import play.api.Play._
import play.api.inject.guice.GuiceApplicationBuilder

import scala.concurrent.Future


class RestRequestDAOSpec(implicit ee: ExecutionEnv) extends Specification {

  val app = new GuiceApplicationBuilder().build()

  override def is =
    s2"""
    RestRequestDAO should                   ${step(start(app))}
        create a new entry                  $save
        update an existing entry            $update
        return entries                      $all
        clear all entries for given user    $clear
                                            ${step(stop(app))}
      """

  val currentTime = System.currentTimeMillis()

  def save = {
    val dao: RestHistoryDAO = app.injector.instanceOf(classOf[RestHistoryDAO])
    val entry = RestRequest("somePath", "someMethod", "theBody", "admin", new Date(123))
    dao.save(entry) must beEqualTo(Some("f909cacf3de2c117ca3c08e472bd1d88")).await
  }

  def update = {
    val dao: RestHistoryDAO = app.injector.instanceOf(classOf[RestHistoryDAO])
    val entry = RestRequest("otherPath", "otherMethod", "otherBody", "admin", new Date(currentTime))
    val existing = dao.save(entry)
    val updated = dao.save(entry.copy(createdAt = new Date(currentTime + 100)))
    (existing must beEqualTo(Some("fad24b7447043f5412c89b12e2b7697c")).await and
      (updated must beEqualTo(Some("fad24b7447043f5412c89b12e2b7697c")).await))
  }

  def all = {
    val dao: RestHistoryDAO = app.injector.instanceOf(classOf[RestHistoryDAO])
    val entries: Future[Seq[RestRequest]] = dao.all("admin")
    val expected: Seq[RestRequest] = Seq(
      RestRequest("otherPath", "otherMethod", "otherBody", "admin", new Date(currentTime + 100)),
      RestRequest("somePath", "someMethod", "theBody", "admin", new Date(123))
    )
    entries must beEqualTo(expected).await
  }

  def clear = {
    val dao: RestHistoryDAO = app.injector.instanceOf(classOf[RestHistoryDAO])
    dao.clear("admin") must beEqualTo(2).await
  }

}
