FROM hseeberger/scala-sbt as cerebro-build
COPY . /root/cerebro
RUN cd cerebro && sbt stage

FROM openjdk:jre-alpine
ARG CEREBRO_VERSION=0.7.3
COPY --from=cerebro-build /root/cerebro/target/universal/stage /opt/cerebro
RUN apk add --no-cache --update bash
WORKDIR /opt/cerebro
EXPOSE 9000
HEALTHCHECK CMD wget --quiet --spider http://localhost:9000/ || exit 1
CMD ["bin/cerebro"]
