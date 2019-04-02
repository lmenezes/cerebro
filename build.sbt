name := "cerebro"

maintainer := "Leonardo Menezes <leonardo.menezes@xing.com>"

version := "0.8.2"

scalaVersion := "2.11.11"

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play"                    % "2.6.15",
  "com.typesafe.play" %% "play-json"               % "2.6.9",
  "com.typesafe.play" %% "play-slick"              % "3.0.3",
  "com.typesafe.play" %% "play-slick-evolutions"   % "3.0.3",
  "org.xerial"        %  "sqlite-jdbc"             % "3.23.1",
  "org.specs2"        %% "specs2-junit"  % "3.9.2" % "test",
  "org.specs2"        %% "specs2-core"   % "3.9.2" % "test",
  "org.specs2"        %% "specs2-mock"   % "3.9.2" % "test"
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
