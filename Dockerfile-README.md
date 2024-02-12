cerebro-docker
--------------

[![Docker Pulls](https://img.shields.io/docker/pulls/lmenezes/cerebro.svg)](https://hub.docker.com/r/lmenezes/cerebro)


cerebro-docker contains the official docker files for [cerebro](https://github.com/lmenezes/cerebro) project.
Images are periodically uploaded in [lmenezes/cerebro](https://hub.docker.com/r/lmenezes/cerebro/) docker hub repo.

### Usage

For using latest cerebro execute:

```
docker run -p 9000:9000 lmenezes/cerebro
```

For using a specific version run:

```
docker run -p 9000:9000 lmenezes/cerebro:0.8.3
```

### Configuration

You can configure a custom port for cerebro by using the `CEREBRO_PORT` environment variable. This defaults to `9000`.

**Example**
```
docker run -e CEREBRO_PORT=8080 -p 8080:8080 lmenezes/cerebro
```
To access an elasticsearch instance running on localhost:
```
docker run -p 9000:9000 --network=host lmenezes/cerebro
```
