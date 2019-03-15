package models

import javax.inject.Singleton

import com.google.inject.{ImplementedBy, Inject}
import play.api.Configuration

import scala.collection.JavaConverters._
import scala.util.{Failure, Success, Try}


@ImplementedBy(classOf[HostsImpl])
trait Hosts {

  def getHostNames(): Seq[String]

  def getServer(name: String): Option[ElasticServer]

}

@Singleton
class HostsImpl @Inject()(config: Configuration) extends Hosts {

  val hosts: Map[String, ElasticServer] = Try(config.underlying.getConfigList("hosts").asScala.map(Configuration(_))) match {
    case Success(hostsConf) => hostsConf.map { hostConf =>
      val host = hostConf.getOptional[String]("host").get
      val name = hostConf.getOptional[String]("name").getOrElse(host)
      val username = hostConf.getOptional[String]("auth.username")
      val password = hostConf.getOptional[String]("auth.password")
      val forward_headers = hostConf.getOptional[Seq[String]](path = "forward_headers").getOrElse(Seq.empty[String])
      (username, password) match {
        case (Some(username), Some(password)) => (name -> ElasticServer(host, Some(ESAuth(username, password)), forward_headers))
        case _ => (name -> ElasticServer(host, None, forward_headers))
      }
    }.toMap
    case Failure(_) => Map()
  }

  def getHostNames() = hosts.keys.toSeq

  def getServer(name: String) = hosts.get(name)

}
