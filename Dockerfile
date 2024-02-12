FROM --platform=linux/amd64 keppel.eu-de-1.cloud.sap/ccloud-dockerhub-mirror/library/openjdk:11-jdk-slim as builder
LABEL source_repository="https://github.com/Kuckkuck/cerebro"

ARG CEREBRO_VERSION=0.9.5


RUN apt-get update && apt upgrade -y && apt-get install -y curl git
RUN cd / && git clone https://github.com/Kuckkuck/cerebro.git
RUN curl -fL https://github.com/coursier/coursier/releases/latest/download/cs-x86_64-pc-linux.gz | gzip -d > cs && chmod +x cs && ./cs setup -y
RUN . ~/.profile && cd /cerebro && sbt universal:packageZipTarball 
RUN cp /cerebro/target/universal/cerebro-${CEREBRO_VERSION}.tgz /opt
RUN mkdir -p /opt/cerebro/logs
RUN tar xzvf /opt/cerebro-${CEREBRO_VERSION}.tgz --strip-components 1 -C /opt/cerebro \
 && sed -i '/<appender-ref ref="FILE"\/>/d' /opt/cerebro/conf/logback.xml

FROM --platform=linux/amd64 keppel.eu-de-1.cloud.sap/ccloud-dockerhub-mirror/library/openjdk:11-jdk-slim
LABEL source_repository="https://github.com/Kuckkuck/cerebro"

COPY --from=builder /opt/cerebro /opt/cerebro
RUN apt-get update && apt upgrade -y
RUN addgroup -gid 1000 cerebro \
 && adduser -q --system --no-create-home --disabled-login -gid 1000 -uid 1000 cerebro \
 && chown -R root:root /opt/cerebro \
 && chown -R cerebro:cerebro /opt/cerebro/logs \
 && chown cerebro:cerebro /opt/cerebro

WORKDIR /opt/cerebro
USER cerebro

ENTRYPOINT [ "/opt/cerebro/bin/cerebro" ]
