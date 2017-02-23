package dao

import java.util.Date

import com.google.inject.{ImplementedBy, Inject}
import play.api.db.slick.DatabaseConfigProvider
import slick.driver.JdbcProfile
import slick.driver.SQLiteDriver.api._
import slick.lifted.TableQuery

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import scala.util.control.NonFatal


@ImplementedBy(classOf[RestHistoryDAOImpl])
trait RestHistoryDAO {

  def all(username: String): Future[Seq[RestRequest]]

  def save(entry: RestRequest): Future[Option[String]]

  def clear(username: String): Future[Int]

}

class RestHistoryDAOImpl @Inject()(dbConfigProvider: DatabaseConfigProvider) extends RestHistoryDAO {

  val dbConfig = dbConfigProvider.get[JdbcProfile]

  val requests = TableQuery[RestRequests]

  def all(username: String): Future[Seq[RestRequest]] = {
    dbConfig.db.run(requests.filter(_.username === username).sortBy(_.createdAt.desc).take(50).result).map { reqs =>
      reqs.map { r => RestRequest(r.path, r.method, r.body, r.username, new Date(r.createdAt)) }
    }
  }

  def save(req: RestRequest): Future[Option[String]] = {
    val previous = dbConfig.db.run(requests.filter(_.md5 === req.md5).result.headOption)
    previous.flatMap {
      case Some(p) =>
        val q = for { r <- requests if r.md5 === p.md5 } yield r.createdAt
        val action = q.update(req.createdAt.getTime)
        dbConfig.db.run(action).map { _ => Some(p.md5) }.recover { case NonFatal(e) => e.printStackTrace(); None }

      case None =>
        val newReq = HashedRestRequest(req.path, req.method, req.body, req.username, req.createdAt.getTime, req.md5)
        val action = requests returning requests.map(_.id) += newReq
        dbConfig.db.run(action).map { _ => Some(newReq.md5) }.recover { case NonFatal(e) => e.printStackTrace; None }
    }
  }

  def clear(username: String): Future[Int] = {
    dbConfig.db.run(requests.filter(_.username === username).delete)
  }

}
