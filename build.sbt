name := "cerebro"

maintainer := "Leonardo Menezes <leonardo.menezes@xing.com>"

packageSummary := "Elasticsearch web admin tool"

packageDescription := """cerebro is an open source(MIT License) elasticsearch web admin tool built
  using Scala, Play Framework, AngularJS and Bootstrap."""

version := "0.9.5"

scalaVersion := "2.13.12"

rpmVendor := "lmenezes"

rpmLicense := Some("MIT")

rpmUrl := Some("http://github.com/lmenezes/cerebro")

val jacksonVersion         = "2.13.4"   // or 2.12.7
val jacksonDatabindVersion = "2.13.4.2" // or 2.12.7.1

val jacksonOverrides = Seq(
  "com.fasterxml.jackson.core"     % "jackson-core",
  "com.fasterxml.jackson.core"     % "jackson-annotations",
  "com.fasterxml.jackson.datatype" % "jackson-datatype-jdk8",
  "com.fasterxml.jackson.datatype" % "jackson-datatype-jsr310"
).map(_ % jacksonVersion)

val jacksonDatabindOverrides = Seq(
  "com.fasterxml.jackson.core" % "jackson-databind" % jacksonDatabindVersion
)

val akkaSerializationJacksonOverrides = Seq(
  "com.fasterxml.jackson.dataformat" % "jackson-dataformat-cbor",
  "com.fasterxml.jackson.module"     % "jackson-module-parameter-names",
  "com.fasterxml.jackson.module"     %% "jackson-module-scala",
).map(_ % jacksonVersion)

libraryDependencies ++= jacksonDatabindOverrides ++ jacksonOverrides ++ akkaSerializationJacksonOverrides
  "com.typesafe.play" %% "play"                    % "2.8.21",
  "com.typesafe.play" %% "play-json"               % "2.10.3",
  "com.typesafe.play" %% "play-slick"              % "5.0.0",
  "com.typesafe.play" %% "play-slick-evolutions"   % "5.0.0",
  "org.xerial"        %  "sqlite-jdbc"             % "3.41.2.2",
  "org.specs2"        %% "specs2-junit"  % "4.10.0" % "test",
  "org.specs2"        %% "specs2-core"   % "4.10.0" % "test",
  "org.specs2"        %% "specs2-mock"   % "4.10.0" % "test"
)

libraryDependencies += filters
libraryDependencies += ws
libraryDependencies += guice

lazy val root = (project in file(".")).
  enablePlugins(PlayScala, BuildInfoPlugin, LauncherJarPlugin, JDebPackaging, RpmPlugin).
  settings(
    buildInfoKeys := Seq[BuildInfoKey](name, version, scalaVersion, sbtVersion),
    buildInfoPackage := "models"
  )

sources in (Compile, doc) := Seq.empty

enablePlugins(JavaServerAppPackaging)
enablePlugins(SystemdPlugin)

pipelineStages := Seq(digest, gzip)

serverLoading := Some(ServerLoader.Systemd)
systemdSuccessExitStatus in Debian += "143"
systemdSuccessExitStatus in Rpm += "143"
linuxPackageMappings += packageTemplateMapping(s"/var/lib/${packageName.value}")() withUser((daemonUser in Linux).value) withGroup((daemonGroup in Linux).value)
