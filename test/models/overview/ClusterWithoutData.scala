package models.overview

import play.api.libs.json.Json

object ClusterWithoutData extends ClusterStub {

  val clusterState = Json.parse(
    """
      |{
      |  "cluster_name":"elasticsearch",
      |  "master_node":"cPsT9o5FQ3WRnvqSTXHiVQ",
      |  "blocks":{
      |
      |  },
      |  "routing_table":{
      |    "indices":{
      |
      |    }
      |  }
      |}
    """.stripMargin
  )

  val nodesStats = Json.parse(
    """
      |{
      |  "cluster_name":"elasticsearch",
      |  "nodes":{
      |    "MoDcZdJkQGK2RpYTvJhQlA":{
      |      "timestamp":1458346589015,
      |      "name":"Solara",
      |      "transport_address":"127.0.0.1:9301",
      |      "host":"127.0.0.1",
      |      "ip":[
      |        "127.0.0.1:9301",
      |        "NONE"
      |      ],
      |      "os":{
      |        "timestamp":1458346589015,
      |        "load_average":3.17138671875,
      |        "mem":{
      |          "total_in_bytes":8589934592,
      |          "free_in_bytes":101085184,
      |          "used_in_bytes":8488849408,
      |          "free_percent":1,
      |          "used_percent":99
      |        },
      |        "swap":{
      |          "total_in_bytes":2147483648,
      |          "free_in_bytes":1736966144,
      |          "used_in_bytes":410517504
      |        }
      |      },
      |      "process":{
      |        "timestamp":1458346589015,
      |        "open_file_descriptors":257,
      |        "max_file_descriptors":10240,
      |        "cpu":{
      |          "percent":0,
      |          "total_in_millis":24084
      |        },
      |        "mem":{
      |          "total_virtual_in_bytes":5274689536
      |        }
      |      },
      |      "jvm":{
      |        "timestamp":1458346589015,
      |        "uptime_in_millis":1106048,
      |        "mem":{
      |          "heap_used_in_bytes":28420720,
      |          "heap_used_percent":2,
      |          "heap_committed_in_bytes":259522560,
      |          "heap_max_in_bytes":1037959168,
      |          "non_heap_used_in_bytes":50725848,
      |          "non_heap_committed_in_bytes":51486720,
      |          "pools":{
      |            "young":{
      |              "used_in_bytes":8929536,
      |              "max_in_bytes":286326784,
      |              "peak_used_in_bytes":71630848,
      |              "peak_max_in_bytes":286326784
      |            },
      |            "survivor":{
      |              "used_in_bytes":6942440,
      |              "max_in_bytes":35782656,
      |              "peak_used_in_bytes":8912888,
      |              "peak_max_in_bytes":35782656
      |            },
      |            "old":{
      |              "used_in_bytes":12548744,
      |              "max_in_bytes":715849728,
      |              "peak_used_in_bytes":12548744,
      |              "peak_max_in_bytes":715849728
      |            }
      |          }
      |        },
      |        "threads":{
      |          "count":67,
      |          "peak_count":87
      |        },
      |        "gc":{
      |          "collectors":{
      |            "young":{
      |              "collection_count":5,
      |              "collection_time_in_millis":76
      |            },
      |            "old":{
      |              "collection_count":1,
      |              "collection_time_in_millis":18
      |            }
      |          }
      |        },
      |        "buffer_pools":{
      |          "direct":{
      |            "count":71,
      |            "used_in_bytes":13640062,
      |            "total_capacity_in_bytes":13640062
      |          },
      |          "mapped":{
      |            "count":0,
      |            "used_in_bytes":0,
      |            "total_capacity_in_bytes":0
      |          }
      |        }
      |      },
      |      "fs":{
      |        "timestamp":1458346589015,
      |        "total":{
      |          "total_in_bytes":249804886016,
      |          "free_in_bytes":41567444992,
      |          "available_in_bytes":41305300992
      |        },
      |        "data":[
      |          {
      |            "path":"/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/1",
      |            "mount":"/ (/dev/disk1)",
      |            "type":"hfs",
      |            "total_in_bytes":249804886016,
      |            "free_in_bytes":41567444992,
      |            "available_in_bytes":41305300992
      |          }
      |        ]
      |      }
      |    },
      |    "cPsT9o5FQ3WRnvqSTXHiVQ":{
      |      "timestamp":1458346589015,
      |      "name":"Cecilia Reyes",
      |      "transport_address":"127.0.0.1:9300",
      |      "host":"127.0.0.1",
      |      "ip":[
      |        "127.0.0.1:9300",
      |        "NONE"
      |      ],
      |      "os":{
      |        "timestamp":1458346589015,
      |        "load_average":3.17138671875,
      |        "mem":{
      |          "total_in_bytes":8589934592,
      |          "free_in_bytes":101085184,
      |          "used_in_bytes":8488849408,
      |          "free_percent":1,
      |          "used_percent":99
      |        },
      |        "swap":{
      |          "total_in_bytes":2147483648,
      |          "free_in_bytes":1736966144,
      |          "used_in_bytes":410517504
      |        }
      |      },
      |      "process":{
      |        "timestamp":1458346589015,
      |        "open_file_descriptors":265,
      |        "max_file_descriptors":10240,
      |        "cpu":{
      |          "percent":0,
      |          "total_in_millis":23221
      |        },
      |        "mem":{
      |          "total_virtual_in_bytes":5287575552
      |        }
      |      },
      |      "jvm":{
      |        "timestamp":1458346589015,
      |        "uptime_in_millis":1114598,
      |        "mem":{
      |          "heap_used_in_bytes":24190184,
      |          "heap_used_percent":2,
      |          "heap_committed_in_bytes":259522560,
      |          "heap_max_in_bytes":1037959168,
      |          "non_heap_used_in_bytes":53616440,
      |          "non_heap_committed_in_bytes":54919168,
      |          "pools":{
      |            "young":{
      |              "used_in_bytes":4830480,
      |              "max_in_bytes":286326784,
      |              "peak_used_in_bytes":71630848,
      |              "peak_max_in_bytes":286326784
      |            },
      |            "survivor":{
      |              "used_in_bytes":4334552,
      |              "max_in_bytes":35782656,
      |              "peak_used_in_bytes":8912896,
      |              "peak_max_in_bytes":35782656
      |            },
      |            "old":{
      |              "used_in_bytes":15025152,
      |              "max_in_bytes":715849728,
      |              "peak_used_in_bytes":15025152,
      |              "peak_max_in_bytes":715849728
      |            }
      |          }
      |        },
      |        "threads":{
      |          "count":72,
      |          "peak_count":106
      |        },
      |        "gc":{
      |          "collectors":{
      |            "young":{
      |              "collection_count":6,
      |              "collection_time_in_millis":85
      |            },
      |            "old":{
      |              "collection_count":1,
      |              "collection_time_in_millis":12
      |            }
      |          }
      |        },
      |        "buffer_pools":{
      |          "direct":{
      |            "count":122,
      |            "used_in_bytes":18508157,
      |            "total_capacity_in_bytes":18508157
      |          },
      |          "mapped":{
      |            "count":0,
      |            "used_in_bytes":0,
      |            "total_capacity_in_bytes":0
      |          }
      |        },
      |        "classes":{
      |          "current_loaded_count":6988,
      |          "total_loaded_count":6988,
      |          "total_unloaded_count":0
      |        }
      |      },
      |      "fs":{
      |        "timestamp":1458346589015,
      |        "total":{
      |          "total_in_bytes":249804886016,
      |          "free_in_bytes":41567444992,
      |          "available_in_bytes":41305300992
      |        },
      |        "data":[
      |          {
      |            "path":"/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/0",
      |            "mount":"/ (/dev/disk1)",
      |            "type":"hfs",
      |            "total_in_bytes":249804886016,
      |            "free_in_bytes":41567444992,
      |            "available_in_bytes":41305300992
      |          }
      |        ]
      |      }
      |    }
      |  }
      |}
    """.stripMargin
  )

  val indicesStats = Json.parse(
    """
      |{
      |  "_shards":{
      |    "total":0,
      |    "successful":0,
      |    "failed":0
      |  },
      |  "_all":{
      |    "primaries":{
      |
      |    },
      |    "total":{
      |
      |    }
      |  },
      |  "indices":{
      |
      |  }
      |}
    """.stripMargin
  )

  val clusterSettings = Json.parse(
    """
      |{
      |  "persistent":{
      |
      |  },
      |  "transient":{
      |
      |  }
      |}
    """.stripMargin
  )

  val aliases = Json.parse(
    """
      |{
      |
      |}
    """.stripMargin
  )

  val clusterHealth = Json.parse(
    """
      |{
      |  "cluster_name":"elasticsearch",
      |  "status":"green",
      |  "timed_out":false,
      |  "number_of_nodes":2,
      |  "number_of_data_nodes":2,
      |  "active_primary_shards":0,
      |  "active_shards":0,
      |  "relocating_shards":0,
      |  "initializing_shards":0,
      |  "unassigned_shards":0,
      |  "delayed_unassigned_shards":0,
      |  "number_of_pending_tasks":0,
      |  "number_of_in_flight_fetch":0,
      |  "task_max_waiting_in_queue_millis":0,
      |  "active_shards_percent_as_number":100
      |}
    """.stripMargin
  )

  val nodes = Json.parse(
    """
      |{
      |  "cluster_name":"elasticsearch",
      |  "nodes":{
      |    "MoDcZdJkQGK2RpYTvJhQlA":{
      |      "name":"Solara",
      |      "transport_address":"127.0.0.1:9301",
      |      "host":"127.0.0.1",
      |      "ip":"127.0.0.1",
      |      "version":"2.1.0",
      |      "build":"72cd1f1",
      |      "http_address":"127.0.0.1:9201",
      |      "attributes": {
      |        "aws_availability_zone": "eu-west-1c",
      |        "node_type": "warm",
      |        "xpack.installed": "true"
      |      },
      |      "os":{
      |        "refresh_interval_in_millis":1000,
      |        "available_processors":8,
      |        "allocated_processors":8
      |      },
      |      "jvm":{
      |        "pid":60238,
      |        "version":"1.8.0_72",
      |        "vm_name":"Java HotSpot(TM) 64-Bit Server VM",
      |        "vm_version":"25.72-b15",
      |        "vm_vendor":"Oracle Corporation",
      |        "start_time_in_millis":1458345483045,
      |        "mem":{
      |          "heap_init_in_bytes":268435456,
      |          "heap_max_in_bytes":1037959168,
      |          "non_heap_init_in_bytes":2555904,
      |          "non_heap_max_in_bytes":0,
      |          "direct_max_in_bytes":1037959168
      |        },
      |        "gc_collectors":[
      |          "ParNew",
      |          "ConcurrentMarkSweep"
      |        ],
      |        "memory_pools":[
      |          "Code Cache",
      |          "Metaspace",
      |          "Compressed Class Space",
      |          "Par Eden Space",
      |          "Par Survivor Space",
      |          "CMS Old Gen"
      |        ]
      |      }
      |    },
      |    "cPsT9o5FQ3WRnvqSTXHiVQ":{
      |      "name":"Cecilia Reyes",
      |      "transport_address":"127.0.0.1:9300",
      |      "host":"127.0.0.1",
      |      "ip":"127.0.0.1",
      |      "version":"2.1.0",
      |      "build":"72cd1f1",
      |      "http_address":"127.0.0.1:9200",
      |      "attributes": {
      |        "aws_availability_zone": "eu-west-1c",
      |        "node_type": "warm",
      |        "xpack.installed": "true"
      |      },
      |      "os":{
      |        "refresh_interval_in_millis":1000,
      |        "name":"Mac OS X",
      |        "arch":"x86_64",
      |        "version":"10.11.3",
      |        "available_processors":8,
      |        "allocated_processors":8
      |      },
      |      "jvm":{
      |        "pid":60169,
      |        "version":"1.8.0_72",
      |        "vm_name":"Java HotSpot(TM) 64-Bit Server VM",
      |        "vm_version":"25.72-b15",
      |        "vm_vendor":"Oracle Corporation",
      |        "start_time_in_millis":1458345474505,
      |        "mem":{
      |          "heap_init_in_bytes":268435456,
      |          "heap_max_in_bytes":1037959168,
      |          "non_heap_init_in_bytes":2555904,
      |          "non_heap_max_in_bytes":0,
      |          "direct_max_in_bytes":1037959168
      |        },
      |        "gc_collectors":[
      |          "ParNew",
      |          "ConcurrentMarkSweep"
      |        ],
      |        "memory_pools":[
      |          "Code Cache",
      |          "Metaspace",
      |          "Compressed Class Space",
      |          "Par Eden Space",
      |          "Par Survivor Space",
      |          "CMS Old Gen"
      |        ]
      |      }
      |    }
      |  }
      |}
    """.stripMargin
  )

  val main = Json.parse(
    """
      |{
      |  "name":"Cecilia Reyes",
      |  "cluster_name":"elasticsearch",
      |  "version":{
      |    "number":"2.1.0",
      |    "build_hash":"72cd1f1a3eee09505e036106146dc1949dc5dc87",
      |    "build_timestamp":"2015-11-18T22:40:03Z",
      |    "build_snapshot":false,
      |    "lucene_version":"5.3.1"
      |  },
      |  "tagline":"You Know, for Search"
      |}
    """.stripMargin
  )

}
