package dao

import java.util.Date

import com.google.inject.{ImplementedBy, Inject}
import play.api.Configuration
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.jdbc.SQLiteProfile.api._
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

class RestHistoryDAOImpl @Inject()(dbConfigProvider: DatabaseConfigProvider,
                                   config: Configuration) extends RestHistoryDAO {

  private val max = config.getOptional[Int]("rest.history.size").getOrElse(50)

  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  private val requests = TableQuery[RestRequests]

  def all(username: String): Future[Seq[RestRequest]] =
    dbConfig.db.run(requests.filter(_.username === username).sortBy(_.createdAt.desc).result).map { reqs =>
      reqs.map { r => RestRequest(r.path, r.method, r.body, r.username, new Date(r.createdAt)) }
    }.recover {
      case NonFatal(e) => throw DAOException(s"Error loading requests for [$username]", e)
    }

  def save(req: RestRequest): Future[Option[String]] =
    findByMd5(req.md5).flatMap {
      case Some(p) =>
        update(p, req.createdAt.getTime)
      case None    =>
        create(req).map { md5 => trim(req.username); md5 }
    }

  def clear(username: String): Future[Int] =
    dbConfig.db.run(requests.filter(_.username === username).delete).recover {
      case NonFatal(e) => throw DAOException(s"Error clearing all requests for [$username]", e)
    }

  private def findByMd5(md5: String): Future[Option[RestRequests#TableElementType]] =
    dbConfig.db.run(requests.filter(_.md5 === md5).result.headOption).recover {
      case NonFatal(e) => throw DAOException(s"Error finding request with MD5 [$md5]", e)
    }

  private def update(req: RestRequests#TableElementType, createdAt: Long): Future[Option[String]] = {
    val q = for { r <- requests if r.md5 === req.md5 } yield r.createdAt
    val action = q.update(createdAt)
    dbConfig.db.run(action).map { _ => Some(req.md5) }.recover {
      case NonFatal(e) => throw DAOException(s"Error while updating request [$req]", e)
    }
  }

  private def create(req: RestRequest): Future[Option[String]] = {
    val newReq = HashedRestRequest(req.path, req.method, req.body, req.username, req.createdAt.getTime, req.md5)
    val action = requests returning requests.map(_.id) += newReq
    dbConfig.db.run(action).map { _ => Some(newReq.md5) }.recover {
      case NonFatal(e) => throw DAOException(s"Error while storing request [$req]", e)
    }
  }

  private def trim(username: String): Unit = {
    val action = sqlu"""
          DELETE FROM rest_requests WHERE id IN (
            SELECT id FROM rest_requests WHERE username=$username ORDER BY created_at DESC LIMIT -1 OFFSET $max
          )
        """
    dbConfig.db.run(action).recover {
      case NonFatal(e) => throw DAOException(s"Error while triming history for [$username]", e)
    }
  }

}
