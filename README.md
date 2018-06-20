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

### Docker image

- Build docker image: `docker build -t cerebro:development .`
- Run the image: `docker run --rm -it -p 9000:9000 cerebro:development`

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
