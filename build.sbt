name := "cerebro"

version := "0.6.2"

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play"                    % "2.5.10",
  "com.typesafe.play" %% "play-ws"                 % "2.5.10",
  "com.typesafe.play" %% "play-slick"              % "2.0.2",
  "com.typesafe.play" %% "play-slick-evolutions"   % "2.0.2",
  "org.xerial"        %  "sqlite-jdbc"             % "3.16.1",
  "org.specs2"        %% "specs2-junit"  % "3.8.4" % "test",
  "org.specs2"        %% "specs2-core"   % "3.8.4" % "test",
  "org.specs2"        %% "specs2-mock"   % "3.8.4" % "test"
)

lazy val root = (project in file(".")).
  enablePlugins(PlayScala, BuildInfoPlugin, LauncherJarPlugin).
  settings(
    buildInfoKeys := Seq[BuildInfoKey](name, version, scalaVersion, sbtVersion),
    buildInfoPackage := "models"
  )

doc in Compile <<= target.map(_ / "none")

pipelineStages := Seq(digest, gzip)
