package models

import javax.inject.Singleton

import com.google.inject.{ImplementedBy, Inject}
import play.api.Configuration

@ImplementedBy(classOf[HostsImpl])
trait Hosts {

  def getHostNames(): Seq[String]

  def getServer(name: String): Option[ElasticServer]

}

@Singleton
class HostsImpl @Inject()(config: Configuration) extends Hosts {

  val hosts: Map[String, ElasticServer] = config.getConfigSeq("hosts") match {
    case Some(hostsConf) => hostsConf.map { hostConf =>
      val host = hostConf.getString("host").get
      val name = hostConf.getString("name").getOrElse(host)
      val username = hostConf.getString("auth.username")
      val password = hostConf.getString("auth.password")
      (username, password) match {
        case (Some(username), Some(password)) => (name -> ElasticServer(host, Some(ESAuth(username, password))))
        case _ => (name -> ElasticServer(host, None))
      }
    }.toMap
    case _ => Map()
  }

  def getHostNames() = hosts.keys.toSeq

  def getServer(name: String) = hosts.get(name)

}
