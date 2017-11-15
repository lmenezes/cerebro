FROM openjdk:8-jre-slim

ARG CEREBRO_VERSION=0.7.1
ENV DEBIAN_FRONTEND noninteractive

RUN addgroup --system cerebro              \
 && adduser --system cerebro               \
 && apt-get update                         \
 && apt-get install --assume-yes apt-utils \
 && apt-get install --assume-yes curl      \
                                 tar       \
 && rm -rf /var/lib/apt/lists/*

RUN /bin/mkdir -p /opt/cerebro/logs                                    \
                  /opt/cerebro/tmp                                     \
 && /usr/bin/curl -Lso /tmp/cerebro.tgz https://github.com/lmenezes/cerebro/releases/download/v${CEREBRO_VERSION}/cerebro-${CEREBRO_VERSION}.tgz \
 && /bin/tar zxf /tmp/cerebro.tgz -C /opt/cerebro --strip-components=1 \
 && /bin/rm -f /tmp/cerebro.tgz                                        \
 && /bin/chown -R cerebro:cerebro /opt/cerebro

USER cerebro
RUN /bin/ln -s /opt/cerebro/lib/cerebro.cerebro-${CEREBRO_VERSION}-launcher.jar /opt/cerebro/lib/cerebro.cerebro-launcher.jar

WORKDIR /opt/cerebro
EXPOSE 9000

CMD ["java", "-Duser.dir=/opt/cerebro", "-cp", "''", "-jar", "/opt/cerebro/lib/cerebro.cerebro-launcher.jar"]