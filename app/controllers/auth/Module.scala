package controllers.auth

import com.google.inject.AbstractModule

class Module extends AbstractModule {

  def configure() = {
    bind(classOf[AuthenticationModule]).to(classOf[AuthenticationModuleImpl]).asEagerSingleton()
  }
}