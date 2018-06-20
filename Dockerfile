FROM openjdk:8-jre-alpine

RUN apk --no-cache add bash

ENV CEREBRO_VERSION 0.8.0
ADD https://github.com/lmenezes/cerebro/releases/download/v${CEREBRO_VERSION}/cerebro-${CEREBRO_VERSION}.tgz /opt/
RUN tar zxvf /opt/cerebro-${CEREBRO_VERSION}.tgz -C /opt && mv /opt/cerebro-${CEREBRO_VERSION} /opt/cerebro
RUN mkdir /opt/cerebro/logs

# remove logback file appender
RUN sed -i '/<appender-ref ref="FILE"\/>/d' /opt/cerebro/conf/logback.xml

WORKDIR /opt/cerebro
EXPOSE 9000
ENTRYPOINT ["./bin/cerebro"]
