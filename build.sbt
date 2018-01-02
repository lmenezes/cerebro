name := "cerebro"

maintainer := "Leonardo Menezes <leonardo.menezes@xing.com>"

version := "0.7.2"

scalaVersion := "2.11.11"

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play"                    % "2.6.7",
  "com.typesafe.play" %% "play-json"               % "2.6.7",
  "com.typesafe.play" %% "play-slick"              % "3.0.1",
  "com.typesafe.play" %% "play-slick-evolutions"   % "3.0.1",
  "org.xerial"        %  "sqlite-jdbc"             % "3.20.0",
  "org.specs2"        %% "specs2-junit"  % "3.8.4" % "test",
  "org.specs2"        %% "specs2-core"   % "3.8.4" % "test",
  "org.specs2"        %% "specs2-mock"   % "3.8.4" % "test"
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

doc in Compile <<= target.map(_ / "none")

enablePlugins(JavaServerAppPackaging)
enablePlugins(SystemdPlugin)

pipelineStages := Seq(digest, gzip)

serverLoading := Some(ServerLoader.Systemd)
systemdSuccessExitStatus in Debian += "143"
systemdSuccessExitStatus in Rpm += "143"
linuxPackageMappings += packageTemplateMapping(s"/var/lib/${packageName.value}")() withUser((daemonUser in Linux).value) withGroup((daemonGroup in Linux).value)
