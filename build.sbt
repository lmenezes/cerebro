name := "cerebro"

version := "0.0.1"

scalaVersion := "2.11.6"

libraryDependencies ++= Seq(
  "org.webjars"       %% "webjars-play"  % "2.4.0-1",
  "org.webjars"       %  "angularjs"     % "1.5.0",
  "org.webjars"       %  "bootstrap"     % "4.0.0-alpha.2",
  "org.webjars"       %  "font-awesome"  % "4.5.0",
  "org.webjars.bower" %  "tether"        % "1.1.1",
  "org.elasticsearch" %  "elasticsearch" % "2.2.0",
  "com.typesafe.play" %% "play-ws"       % "2.4.6",
  "org.specs2"        %% "specs2-junit"  % "3.6.5",
  "org.specs2"        %% "specs2-core"   % "3.6.5",
  "org.specs2"        %% "specs2-mock"   % "3.6.5"
)

lazy val root = (project in file(".")).enablePlugins(PlayScala)

pipelineStages := Seq(digest, gzip)
