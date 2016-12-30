package controllers.auth

trait AuthService {

  def auth(username: String, password: String): Option[String]

}
