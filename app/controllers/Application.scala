package controllers

import com.google.inject.Inject
import controllers.auth.AuthenticationModule
import play.api.mvc.Controller

class Application @Inject()(val authentication: AuthenticationModule) extends Controller with AuthSupport {

  def index = AuthAction(authentication) { request =>
    Ok(views.html.Index())
  }
  
}
