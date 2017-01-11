package elastic

import com.google.inject.AbstractModule

class ElasticModule extends AbstractModule {

  def configure() = {
    bind(classOf[ElasticClient]).to(classOf[HTTPElasticClient]).asEagerSingleton()
  }

}
