package models

import javax.inject.Singleton

import com.google.inject.{ImplementedBy, Inject}
import play.api.Configuration

import scala.jdk.CollectionConverters._
import scala.util.{Failure, Success, Try}


@ImplementedBy(classOf[HostsImpl])
trait Hosts {

  def getHostNames(): Seq[String]

  def getHost(name: String): Option[Host]

}

@Singleton
class HostsImpl @Inject()(config: Configuration) extends Hosts {

  val hosts: Map[String, Host] = Try(config.underlying.getConfigList("hosts").asScala.map(Configuration(_))) match {
    case Success(hostsConf) => hostsConf.map { hostConf =>
      val host = hostConf.getOptional[String]("host").get
      val name = hostConf.getOptional[String]("name").getOrElse(host)
      val username = hostConf.getOptional[String]("auth.username")
      val password = hostConf.getOptional[String]("auth.password")
      val headersWhitelist = hostConf.getOptional[Seq[String]](path = "headers-whitelist")  .getOrElse(Seq.empty[String])
      (username, password) match {
        case (Some(username), Some(password)) => name -> Host(host, Some(ESAuth(username, password)), headersWhitelist)
        case _ => name -> Host(host, None, headersWhitelist)
      }
    }.toMap
    case Failure(_) => Map()
  }

  def getHostNames() = hosts.keys.toSeq

  def getHost(name: String) = hosts.get(name)

}
