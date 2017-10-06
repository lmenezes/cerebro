package services.overview

import play.api.libs.json.Json

object NodesInfo {

  val node5 = Json.parse(
    """
      |  {
      |    "id": "rtOe",
      |    "ip": "127.0.0.1",
      |    "version": "5.3.0",
      |    "jdk": "1.8.0_92",
      |    "disk.avail": "114.5gb",
      |    "heap.current": "461.6mb",
      |    "heap.percent": "23",
      |    "heap.max": "1.9gb",
      |    "cpu": "24",
      |    "load_1m": "2.34",
      |    "node.role": "mdi",
      |    "master": "*",
      |    "name": "rtOejLm"
      |  }
    """.stripMargin
  )

  val awsInfo = Json.parse(
    """
      |  {
      |    "id": "rtOe",
      |    "ip": null,
      |    "version": "5.3.0",
      |    "jdk": null,
      |    "disk.avail": "114.5gb",
      |    "heap.current": "461.6mb",
      |    "heap.percent": "23",
      |    "heap.max": "1.9gb",
      |    "cpu": "24",
      |    "load_1m": "2.34",
      |    "node.role": "mdi",
      |    "master": "*",
      |    "name": "rtOejLm"
      |  }
    """.stripMargin
  )


}
