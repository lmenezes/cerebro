name := "cerebro"

maintainer := "Leonardo Menezes <leonardo.menezes@xing.com>"

packageSummary := "Elasticsearch web admin tool"

packageDescription := """cerebro is an open source(MIT License) elasticsearch web admin tool built
  using Scala, Play Framework, AngularJS and Bootstrap."""

version := "0.9.4"

scalaVersion := "2.13.15"

rpmVendor := "lmenezes"

rpmLicense := Some("MIT")

rpmUrl := Some("http://github.com/lmenezes/cerebro")

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play"                    % "2.9.5",
  "com.typesafe.play" %% "play-json"               % "2.10.6",
  "com.typesafe.play" %% "play-slick"              % "5.3.1",
  "com.typesafe.play" %% "play-slick-evolutions"   % "5.3.1",
  "org.xerial"        %  "sqlite-jdbc"             % "3.47.1.0",
  "org.specs2"        %% "specs2-junit"  % "4.20.9" % "test",
  "org.specs2"        %% "specs2-core"   % "4.20.9" % "test",
  "org.specs2"        %% "specs2-mock"   % "4.20.9" % "test"
)

libraryDependencies += filters
libraryDependencies += ws
libraryDependencies += guice

// Add Java 17+ compatibility for tests (opens internal packages for Guice/CGLib)
Test / javaOptions ++= Seq(
  "--add-opens=java.base/java.lang=ALL-UNNAMED",
  "--add-opens=java.base/java.lang.invoke=ALL-UNNAMED",
  "--add-opens=java.base/java.lang.reflect=ALL-UNNAMED",
  "--add-opens=java.base/java.util=ALL-UNNAMED"
)

lazy val root = (project in file(".")).
  enablePlugins(PlayScala, BuildInfoPlugin, LauncherJarPlugin, JDebPackaging, RpmPlugin).
  settings(
    buildInfoKeys := Seq[BuildInfoKey](name, version, scalaVersion, sbtVersion),
    buildInfoPackage := "models"
  )

Compile / doc / sources := Seq.empty

enablePlugins(JavaServerAppPackaging)
enablePlugins(SystemdPlugin)

pipelineStages := Seq(digest, gzip)

serverLoading := Some(ServerLoader.Systemd)
Debian / systemdSuccessExitStatus += "143"
Rpm / systemdSuccessExitStatus += "143"
linuxPackageMappings += packageTemplateMapping(s"/var/lib/${packageName.value}")() withUser((Linux / daemonUser).value) withGroup((Linux / daemonGroup).value)
