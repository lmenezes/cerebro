FROM openjdk:8-jre-alpine

ENV CEREBRO_VERSION 0.8.1

RUN apk add --no-cache bash \
 && mkdir -p /opt/cerebro/logs \
 && wget -qO- https://github.com/lmenezes/cerebro/releases/download/v${CEREBRO_VERSION}/cerebro-${CEREBRO_VERSION}.tgz \
  | tar xzv --strip-components 1 -C /opt/cerebro \
 && sed -i '/<appender-ref ref="FILE"\/>/d' /opt/cerebro/conf/logback.xml \
 && addgroup -g 1000 cerebro \
 && adduser -D -G cerebro -u 1000 cerebro \
 && chown -R cerebro:cerebro /opt/cerebro

WORKDIR /opt/cerebro
EXPOSE 9000
USER cerebro
ENTRYPOINT [ "/opt/cerebro/bin/cerebro" ]
