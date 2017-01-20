name := "cerebro"

version := "0.3.1"

scalaVersion := "2.11.8"

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play"          % "2.5.10",
  "com.typesafe.play" %% "play-ws"       % "2.5.10",
  "org.specs2"        %% "specs2-junit"  % "3.8.4" % "test",
  "org.specs2"        %% "specs2-core"   % "3.8.4" % "test",
  "org.specs2"        %% "specs2-mock"   % "3.8.4" % "test"
)

lazy val root = (project in file(".")).enablePlugins(PlayScala)

doc in Compile <<= target.map(_ / "none")

pipelineStages := Seq(digest, gzip)
