name := "cerebro"

maintainer := "Leonardo Menezes <leonardo.menezes@xing.com>"

version := "0.8.2"

scalaVersion := "2.12.8"

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play"                    % "2.7.0",
  "com.typesafe.play" %% "play-json"               % "2.7.2",
  "com.typesafe.play" %% "play-slick"              % "4.0.0",
  "com.typesafe.play" %% "play-slick-evolutions"   % "4.0.0",
  "org.xerial"        %  "sqlite-jdbc"             % "3.23.1",
  "org.specs2"        %% "specs2-junit"  % "4.3.4" % "test",
  "org.specs2"        %% "specs2-core"   % "4.3.4" % "test",
  "org.specs2"        %% "specs2-mock"   % "4.3.4" % "test"
)

libraryDependencies += filters
libraryDependencies += ws
libraryDependencies += guice

lazy val root = (project in file(".")).
  enablePlugins(PlayScala, BuildInfoPlugin, LauncherJarPlugin).
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
