package controllers

import controllers.auth.AuthenticationModule
import elastic.ElasticClient
import org.specs2.Specification
import org.specs2.mock.Mockito
import org.specs2.specification.BeforeEach
import play.api.inject.bind
import play.api.inject.guice.GuiceApplicationBuilder

trait MockedServices extends Specification with BeforeEach with Mockito {

  val client = mock[ElasticClient]

  val auth = mock[AuthenticationModule]
  auth.isEnabled returns false

  override def before() = {
    org.mockito.Mockito.reset(client)
  }

  val application = new GuiceApplicationBuilder().
    overrides(
      bind[ElasticClient].toInstance(client),
      bind[AuthenticationModule].toInstance(auth)
    ).build()

}
