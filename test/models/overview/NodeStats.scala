package models.overview

import play.api.libs.json.Json

object NodeStats {

  val nodeStats5 = Json.parse(
    """
      |{
      |  "timestamp":1458346589015,
      |  "name":"Solara",
      |  "transport_address":"127.0.0.1:9301",
      |  "host":"127.0.0.1",
      |  "ip":[
      |    "127.0.0.1:9301",
      |    "NONE"
      |  ],
      |  "os":{
      |    "timestamp":1458346589015,
      |    "load_average":3.17138671875,
      |    "mem":{
      |      "total_in_bytes":8589934592,
      |      "free_in_bytes":101085184,
      |      "used_in_bytes":8488849408,
      |      "free_percent":1,
      |      "used_percent":99
      |    },
      |    "swap":{
      |      "total_in_bytes":2147483648,
      |      "free_in_bytes":1736966144,
      |      "used_in_bytes":410517504
      |    }
      |  },
      |  "process":{
      |    "timestamp":1458346589015,
      |    "open_file_descriptors":257,
      |    "max_file_descriptors":10240,
      |    "cpu":{
      |      "percent":0,
      |      "total_in_millis":24084
      |    },
      |    "mem":{
      |      "total_virtual_in_bytes":5274689536
      |    }
      |  },
      |  "jvm":{
      |    "timestamp":1458346589015,
      |    "uptime_in_millis":1106048,
      |    "mem":{
      |      "heap_used_in_bytes":28420720,
      |      "heap_used_percent":2,
      |      "heap_committed_in_bytes":259522560,
      |      "heap_max_in_bytes":1037959168,
      |      "non_heap_used_in_bytes":50725848,
      |      "non_heap_committed_in_bytes":51486720,
      |      "pools":{
      |        "young":{
      |          "used_in_bytes":8929536,
      |          "max_in_bytes":286326784,
      |          "peak_used_in_bytes":71630848,
      |          "peak_max_in_bytes":286326784
      |        },
      |        "survivor":{
      |          "used_in_bytes":6942440,
      |          "max_in_bytes":35782656,
      |          "peak_used_in_bytes":8912888,
      |          "peak_max_in_bytes":35782656
      |        },
      |        "old":{
      |          "used_in_bytes":12548744,
      |          "max_in_bytes":715849728,
      |          "peak_used_in_bytes":12548744,
      |          "peak_max_in_bytes":715849728
      |        }
      |      }
      |    },
      |    "threads":{
      |      "count":67,
      |      "peak_count":87
      |    },
      |    "gc":{
      |      "collectors":{
      |        "young":{
      |          "collection_count":5,
      |          "collection_time_in_millis":76
      |        },
      |        "old":{
      |          "collection_count":1,
      |          "collection_time_in_millis":18
      |        }
      |      }
      |    },
      |    "buffer_pools":{
      |      "direct":{
      |        "count":71,
      |        "used_in_bytes":13640062,
      |        "total_capacity_in_bytes":13640062
      |      },
      |      "mapped":{
      |        "count":0,
      |        "used_in_bytes":0,
      |        "total_capacity_in_bytes":0
      |      }
      |    }
      |  },
      |  "fs":{
      |    "timestamp":1458346589015,
      |    "total":{
      |      "total_in_bytes":249804886016,
      |      "free_in_bytes":41567444992,
      |      "available_in_bytes":41305300992
      |    },
      |    "data":[
      |      {
      |        "path":"/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/1",
      |        "mount":"/ (/dev/disk1)",
      |        "type":"hfs",
      |        "total_in_bytes":249804886016,
      |        "free_in_bytes":41567444992,
      |        "available_in_bytes":41305300992
      |      }
      |    ]
      |  }
      |}
    """.stripMargin
  )

  val awsNodeStats5 = Json.parse(
    """
      |{
      |  "timestamp":1458346589015,
      |  "name":"Solara",
      |  "os":{
      |    "timestamp":1458346589015,
      |    "load_average":3.17138671875,
      |    "mem":{
      |      "total_in_bytes":8589934592,
      |      "free_in_bytes":101085184,
      |      "used_in_bytes":8488849408,
      |      "free_percent":1,
      |      "used_percent":99
      |    },
      |    "swap":{
      |      "total_in_bytes":2147483648,
      |      "free_in_bytes":1736966144,
      |      "used_in_bytes":410517504
      |    }
      |  },
      |  "process":{
      |    "timestamp":1458346589015,
      |    "open_file_descriptors":257,
      |    "max_file_descriptors":10240,
      |    "cpu":{
      |      "percent":0,
      |      "total_in_millis":24084
      |    },
      |    "mem":{
      |      "total_virtual_in_bytes":5274689536
      |    }
      |  },
      |  "jvm":{
      |    "timestamp":1458346589015,
      |    "uptime_in_millis":1106048,
      |    "mem":{
      |      "heap_used_in_bytes":28420720,
      |      "heap_used_percent":2,
      |      "heap_committed_in_bytes":259522560,
      |      "heap_max_in_bytes":1037959168,
      |      "non_heap_used_in_bytes":50725848,
      |      "non_heap_committed_in_bytes":51486720,
      |      "pools":{
      |        "young":{
      |          "used_in_bytes":8929536,
      |          "max_in_bytes":286326784,
      |          "peak_used_in_bytes":71630848,
      |          "peak_max_in_bytes":286326784
      |        },
      |        "survivor":{
      |          "used_in_bytes":6942440,
      |          "max_in_bytes":35782656,
      |          "peak_used_in_bytes":8912888,
      |          "peak_max_in_bytes":35782656
      |        },
      |        "old":{
      |          "used_in_bytes":12548744,
      |          "max_in_bytes":715849728,
      |          "peak_used_in_bytes":12548744,
      |          "peak_max_in_bytes":715849728
      |        }
      |      }
      |    },
      |    "threads":{
      |      "count":67,
      |      "peak_count":87
      |    },
      |    "gc":{
      |      "collectors":{
      |        "young":{
      |          "collection_count":5,
      |          "collection_time_in_millis":76
      |        },
      |        "old":{
      |          "collection_count":1,
      |          "collection_time_in_millis":18
      |        }
      |      }
      |    },
      |    "buffer_pools":{
      |      "direct":{
      |        "count":71,
      |        "used_in_bytes":13640062,
      |        "total_capacity_in_bytes":13640062
      |      },
      |      "mapped":{
      |        "count":0,
      |        "used_in_bytes":0,
      |        "total_capacity_in_bytes":0
      |      }
      |    }
      |  },
      |  "fs":{
      |    "timestamp":1458346589015,
      |    "total":{
      |      "total_in_bytes":249804886016,
      |      "free_in_bytes":41567444992,
      |      "available_in_bytes":41305300992
      |    },
      |    "data":[
      |      {
      |        "path":"/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/1",
      |        "mount":"/ (/dev/disk1)",
      |        "type":"hfs",
      |        "total_in_bytes":249804886016,
      |        "free_in_bytes":41567444992,
      |        "available_in_bytes":41305300992
      |      }
      |    ]
      |  }
      |}
    """.stripMargin
  )

}