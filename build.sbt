name := "cerebro"

version := "0.3.0"

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  "com.typesafe.play" %% "play"          % "2.4.6",
  "com.typesafe.play" %% "play-ws"       % "2.4.6",
  "org.specs2"        %% "specs2-junit"  % "3.6.5" % "test",
  "org.specs2"        %% "specs2-core"   % "3.6.5" % "test",
  "org.specs2"        %% "specs2-mock"   % "3.6.5" % "test"
)

lazy val root = (project in file(".")).enablePlugins(PlayScala)

doc in Compile <<= target.map(_ / "none")

pipelineStages := Seq(digest, gzip)
