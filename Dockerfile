FROM anapsix/alpine-java
#FROM java:8u111-jre-alpine
# Cannot currently use java compiled against musl due to the following error.
# Failed to load native library:sqlite-3.16.1-4b4890ee-cfe0-46f3-b7d8-a17a72286a8e-libsqlitejdbc.so. osinfo: Linux/x86_64
# java.lang.UnsatisfiedLinkError: /opt/cerebro/tmp/sqlite-3.16.1-4b4890ee-cfe0-46f3-b7d8-a17a72286a8e-libsqlitejdbc.so: Error relocating /opt/cerebro/tmp/sqlite-3.16.1-4b4890ee-cfe0-46f3-b7d8-a17a72286a8e-libsqlitejdbc.so: __isnan: symbol not found
# It should be safe to switch back to the official java jre base, with minimal musl, when they correct the issue.

ARG CEREBRO_VERSION=0.6.5
RUN addgroup -S cerebro && adduser -S -G cerebro cerebro \
    && apk add --no-cache 'su-exec>=0.2' curl tar bash \
    && /bin/mkdir -p /opt/cerebro/logs /opt/cerebro/tmp

RUN cd /opt/ \
    && /usr/bin/curl -Lso cerebro.tgz https://github.com/lmenezes/cerebro/releases/download/v${CEREBRO_VERSION}/cerebro-${CEREBRO_VERSION}.tgz \
    && /bin/tar zxf cerebro.tgz -C /opt/cerebro --strip-components=1 \
    && /bin/rm -f cerebro.tgz \
    && /bin/chown -R cerebro:cerebro /opt/cerebro \
    && su-exec cerebro /bin/ln -s /opt/cerebro/lib/cerebro.cerebro-${CEREBRO_VERSION}-launcher.jar /opt/cerebro/lib/cerebro.cerebro-launcher.jar

WORKDIR /opt/cerebro
EXPOSE 9000
CMD ["su-exec", "cerebro", "java", "-Duser.dir=/opt/cerebro", "-cp", "''", "-jar", "/opt/cerebro/lib/cerebro.cerebro-launcher.jar"]