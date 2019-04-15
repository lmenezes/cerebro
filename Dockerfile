FROM openjdk:11-jre-slim

ENV CEREBRO_VERSION 0.8.3

ADD target/universal/cerebro-${CEREBRO_VERSION}.tgz /opt

RUN mv /opt/cerebro-$CEREBRO_VERSION /opt/cerebro \
 && apt-get update \
 && apt-get install -y wget \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir -p /opt/cerebro/logs \
 && sed -i '/<appender-ref ref="FILE"\/>/d' /opt/cerebro/conf/logback.xml \
 && addgroup -gid 1000 cerebro \
 && adduser -gid 1000 -uid 1000 cerebro \
 && chown -R cerebro:cerebro /opt/cerebro

WORKDIR /opt/cerebro
EXPOSE 9000
USER cerebro
ENTRYPOINT [ "/opt/cerebro/bin/cerebro" ]