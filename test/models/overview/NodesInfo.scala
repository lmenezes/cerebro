package models.overview

import play.api.libs.json.Json

object NodesInfo {

  val nodeInfo5 = Json.parse(
    """
      |{
      |  "name":"Solara",
      |  "transport_address":"127.0.0.1:9301",
      |  "host":"127.0.0.1",
      |  "ip":"127.0.0.1",
      |  "version":"2.1.0",
      |  "build":"72cd1f1",
      |  "http_address":"127.0.0.1:9201",
      |  "os":{
      |    "refresh_interval_in_millis":1000,
      |    "available_processors":8,
      |    "allocated_processors":8
      |  },
      |  "jvm":{
      |    "pid":60238,
      |    "version":"1.8.0_72",
      |    "vm_name":"Java HotSpot(TM) 64-Bit Server VM",
      |    "vm_version":"25.72-b15",
      |    "vm_vendor":"Oracle Corporation",
      |    "start_time_in_millis":1458345483045,
      |    "mem":{
      |      "heap_init_in_bytes":268435456,
      |      "heap_max_in_bytes":1037959168,
      |      "non_heap_init_in_bytes":2555904,
      |      "non_heap_max_in_bytes":0,
      |      "direct_max_in_bytes":1037959168
      |    },
      |    "gc_collectors":[
      |      "ParNew",
      |      "ConcurrentMarkSweep"
      |    ],
      |    "memory_pools":[
      |      "Code Cache",
      |      "Metaspace",
      |      "Compressed Class Space",
      |      "Par Eden Space",
      |      "Par Survivor Space",
      |      "CMS Old Gen"
      |    ]
      |  }
      |}
    """.stripMargin
  )

  val awsInfo = Json.parse(
    """
      |{
      |  "name":"Solara",
      |  "version":"2.1.0",
      |  "build":"72cd1f1",
      |  "os":{
      |    "refresh_interval_in_millis":1000,
      |    "available_processors":8,
      |    "allocated_processors":8
      |  },
      |  "jvm":{
      |    "pid":60238,
      |    "vm_name":"Java HotSpot(TM) 64-Bit Server VM",
      |    "vm_version":"25.72-b15",
      |    "vm_vendor":"Oracle Corporation",
      |    "start_time_in_millis":1458345483045,
      |    "mem":{
      |      "heap_init_in_bytes":268435456,
      |      "heap_max_in_bytes":1037959168,
      |      "non_heap_init_in_bytes":2555904,
      |      "non_heap_max_in_bytes":0,
      |      "direct_max_in_bytes":1037959168
      |    },
      |    "gc_collectors":[
      |      "ParNew",
      |      "ConcurrentMarkSweep"
      |    ],
      |    "memory_pools":[
      |      "Code Cache",
      |      "Metaspace",
      |      "Compressed Class Space",
      |      "Par Eden Space",
      |      "Par Survivor Space",
      |      "CMS Old Gen"
      |    ]
      |  }
      |}
    """.stripMargin
  )


}
