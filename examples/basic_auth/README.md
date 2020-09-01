# How to configure basic auth

## Dockerized environment

When running cerebro's docker image the following environment variable must be set.

- `AUTH_TYPE`: must be set to `basic`  
- `BASIC_AUTH_USER`
- `BASIC_AUTH_PWD`

This [docker-compose](./docker-compose.yml) shows how to configure cerebro with basic auth and the user `admin`/`admin`.

## Downloading the tgz

In order to configure basic auth with `admin`/`admin` user just run the following command:

`./bin/cerebro -DAUTH_TYPE=basic -DBASIC_AUTH_USER=admin -DBASIC_AUTH_PWD=admin`

If overriding more settings is needed, it might be more convenient to create your `application.conf` file as explainded [here](https://github.com/lmenezes/cerebro#other-settings)
