package controllers

import com.google.inject.Inject
import controllers.auth.AuthenticationModule
import play.api.mvc.InjectedController

class Application @Inject()(val authentication: AuthenticationModule) extends InjectedController with AuthSupport {

  def index = AuthAction(authentication, true)(defaultExecutionContext) { request =>
    Ok(views.html.Index())
  }
  
}
