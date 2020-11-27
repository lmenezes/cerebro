package models.commons

import play.api.libs.json.Json

object NodeInfoData {

  val nodeInfo7_10 = Json.parse(
    """
      |{
      |  "build_hash": "5395e21",
      |  "host": "127.0.0.1",
      |  "ip": "127.0.0.1",
      |  "attributes": {
      |    "aws_availability_zone": "eu-west-1c",
      |    "node_type": "warm",
      |    "xpack.installed": "true"
      |  },
      |  "jvm": {
      |    "gc_collectors": [
      |      "ParNew",
      |      "ConcurrentMarkSweep"
      |    ],
      |    "mem": {
      |      "direct_max": "1.9gb",
      |      "direct_max_in_bytes": 2112618496,
      |      "heap_init": "2gb",
      |      "heap_init_in_bytes": 2147483648,
      |      "heap_max": "1.9gb",
      |      "heap_max_in_bytes": 2112618496,
      |      "non_heap_init": "2.4mb",
      |      "non_heap_init_in_bytes": 2555904,
      |      "non_heap_max": "0b",
      |      "non_heap_max_in_bytes": 0
      |    },
      |    "memory_pools": [
      |      "Code Cache",
      |      "Metaspace",
      |      "Compressed Class Space",
      |      "Par Eden Space",
      |      "Par Survivor Space",
      |      "CMS Old Gen"
      |    ],
      |    "pid": 68969,
      |    "start_time": "2017-05-24T07:02:10.338Z",
      |    "start_time_in_millis": 1495609330338,
      |    "using_compressed_ordinary_object_pointers": "true",
      |    "version": "1.8.0_131",
      |    "vm_name": "Java HotSpot(TM) 64-Bit Server VM",
      |    "vm_vendor": "Oracle Corporation",
      |    "vm_version": "25.131-b11"
      |  },
      |  "name": "-qkZcMt",
      |  "os": {
      |    "allocated_processors": 4,
      |    "arch": "x86_64",
      |    "available_processors": 4,
      |    "name": "Mac OS X",
      |    "refresh_interval": "1s",
      |    "refresh_interval_in_millis": 1000,
      |    "version": "10.12.5"
      |  },
      |  "roles": [
      |    "master",
      |    "data_content",
      |    "ingest"
      |  ],
      |  "transport_address": "127.0.0.1:9300",
      |  "version": "5.1.1"
      |}
    """.stripMargin
  )

  val nodeInfo5 = Json.parse(
    """
      |{
      |  "build_hash": "5395e21",
      |  "host": "127.0.0.1",
      |  "ip": "127.0.0.1",
      |  "attributes": {
      |    "aws_availability_zone": "eu-west-1c",
      |    "node_type": "warm",
      |    "xpack.installed": "true"
      |  },
      |  "jvm": {
      |    "gc_collectors": [
      |      "ParNew",
      |      "ConcurrentMarkSweep"
      |    ],
      |    "mem": {
      |      "direct_max": "1.9gb",
      |      "direct_max_in_bytes": 2112618496,
      |      "heap_init": "2gb",
      |      "heap_init_in_bytes": 2147483648,
      |      "heap_max": "1.9gb",
      |      "heap_max_in_bytes": 2112618496,
      |      "non_heap_init": "2.4mb",
      |      "non_heap_init_in_bytes": 2555904,
      |      "non_heap_max": "0b",
      |      "non_heap_max_in_bytes": 0
      |    },
      |    "memory_pools": [
      |      "Code Cache",
      |      "Metaspace",
      |      "Compressed Class Space",
      |      "Par Eden Space",
      |      "Par Survivor Space",
      |      "CMS Old Gen"
      |    ],
      |    "pid": 68969,
      |    "start_time": "2017-05-24T07:02:10.338Z",
      |    "start_time_in_millis": 1495609330338,
      |    "using_compressed_ordinary_object_pointers": "true",
      |    "version": "1.8.0_131",
      |    "vm_name": "Java HotSpot(TM) 64-Bit Server VM",
      |    "vm_vendor": "Oracle Corporation",
      |    "vm_version": "25.131-b11"
      |  },
      |  "name": "-qkZcMt",
      |  "os": {
      |    "allocated_processors": 4,
      |    "arch": "x86_64",
      |    "available_processors": 4,
      |    "name": "Mac OS X",
      |    "refresh_interval": "1s",
      |    "refresh_interval_in_millis": 1000,
      |    "version": "10.12.5"
      |  },
      |  "roles": [
      |    "master",
      |    "data",
      |    "ingest"
      |  ],
      |  "transport_address": "127.0.0.1:9300",
      |  "version": "5.1.1"
      |}
    """.stripMargin
  )

  val awsInfo = Json.parse(
    """
      |{
      |  "build_hash": "5395e21",
      |  "attributes": {
      |    "aws_availability_zone": "eu-west-1c",
      |    "node_type": "warm",
      |    "xpack.installed": "true"
      |  },
      |  "jvm": {
      |    "mem": {
      |      "direct_max": "1.9gb",
      |      "direct_max_in_bytes": 2130051072,
      |      "heap_init": "2gb",
      |      "heap_init_in_bytes": 2147483648,
      |      "heap_max": "1.9gb",
      |      "heap_max_in_bytes": 2130051072,
      |      "non_heap_init": "2.4mb",
      |      "non_heap_init_in_bytes": 2555904,
      |      "non_heap_max": "0b",
      |      "non_heap_max_in_bytes": 0
      |    },
      |    "pid": 4463,
      |    "start_time": "2017-05-18T14:14:43.665Z",
      |    "start_time_in_millis": 1495116883665,
      |    "using_compressed_ordinary_object_pointers": "true"
      |  },
      |  "name": "007ywNv",
      |  "os": {
      |    "allocated_processors": 2,
      |    "available_processors": 2,
      |    "refresh_interval": "1s",
      |    "refresh_interval_in_millis": 1000
      |  },
      |  "roles": [
      |    "master",
      |    "data",
      |    "ingest"
      |  ],
      |  "version": "5.1.1"
      |}
    """.stripMargin
  )

  val noAttributesNode = Json.parse(
    """
      |{
      |  "build_hash": "5395e21",
      |  "jvm": {
      |    "mem": {
      |      "direct_max": "1.9gb",
      |      "direct_max_in_bytes": 2130051072,
      |      "heap_init": "2gb",
      |      "heap_init_in_bytes": 2147483648,
      |      "heap_max": "1.9gb",
      |      "heap_max_in_bytes": 2130051072,
      |      "non_heap_init": "2.4mb",
      |      "non_heap_init_in_bytes": 2555904,
      |      "non_heap_max": "0b",
      |      "non_heap_max_in_bytes": 0
      |    },
      |    "pid": 4463,
      |    "start_time": "2017-05-18T14:14:43.665Z",
      |    "start_time_in_millis": 1495116883665,
      |    "using_compressed_ordinary_object_pointers": "true"
      |  },
      |  "name": "007ywNv",
      |  "os": {
      |    "allocated_processors": 2,
      |    "available_processors": 2,
      |    "refresh_interval": "1s",
      |    "refresh_interval_in_millis": 1000
      |  },
      |  "roles": [
      |    "master",
      |    "data",
      |    "ingest"
      |  ],
      |  "version": "5.1.1"
      |}
    """.stripMargin
  )

}
