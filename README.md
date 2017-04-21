Cerebro
------------

cerebro is an open source(MIT License) elasticsearch web admin tool built using Scala, Play Framework, AngularJS and Bootstrap.

### Requirements

cerebro needs Java 1.8 or newer to run.

### Installation
- Download from [https://github.com/lmenezes/cerebro/releases](https://github.com/lmenezes/cerebro/releases)
- Extract files
- Run bin/cerebro(or bin/cerebro.bat if on Windows)
- Access on http://localhost:9000

### Configuration

#### HTTP server address and port
You can run cerebro listening on a different host and port(defaults to 0.0.0.0:9000):

```
bin/cerebro -Dhttp.port=1234 -Dhttp.address=127.0.0.1
```

#### Other settings

Other settings are exposed through the **conf/application.conf** file found on the application directory.

It is also possible to use an alternate configuration file defined on a different location:

```
bin/cerebro -Dconfig.file=/some/other/dir/alternate.conf
```

### Docker

A v2.1 [docker-compose.yml](https://docs.docker.com/compose/compose-file/compose-file-v2/#version-21) is available that defaults to building a two node cluster with a single master node and a single data node.

#### Starting the Docker environment

   ```bash
   docker-compose up -d
   ```

#### Accessing the Docker environment

You can now browse to [http://localhost:9000/#/nodes?host=http:%2F%2Felasticsearch:9200](http://localhost:9000/#/nodes?host=http:%2F%2Felasticsearch:9200) in order to access Cerebro.

#### Scaling out data nodes in the Docker environment

If you wish to scale out the number of data nodes, you may simply issue the following command

   ```bash
   docker-compose scale elasticsearch-data=3
   ```

#### Scaling back data nodes in the Docker environment

If you wish to scale back on the number of data nodes, you may simply issue the following command

   ```bash
   docker-compose scale elasticsearch-data=1
   ```

#### Shutting down the Docker environment

If you wish to stop the environment then you may issue the following command

   ```bash
   docker-compose down
   ```