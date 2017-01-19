package controllers.auth

class OpenAuthService extends AuthService {

  override def auth(username: String, password: String): Option[String] = None

}
