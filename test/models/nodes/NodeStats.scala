package models.nodes

import play.api.libs.json.Json

object NodeStats {

  val nodeStats5 = Json.parse(
    """
      |{
      |  "fs": {
      |    "data": [
      |      {
      |        "available": "71.8gb",
      |        "available_in_bytes": 77180944384,
      |        "free": "72.1gb",
      |        "free_in_bytes": 77443088384,
      |        "mount": "/ (/dev/disk1)",
      |        "path": "/path/to/elasticsearch/data/nodes/0",
      |        "total": "232.1gb",
      |        "total_in_bytes": 249263407104,
      |        "type": "hfs"
      |      }
      |    ],
      |    "timestamp": 1495609438814,
      |    "total": {
      |      "available": "71.8gb",
      |      "available_in_bytes": 77180944384,
      |      "free": "72.1gb",
      |      "free_in_bytes": 77443088384,
      |      "total": "232.1gb",
      |      "total_in_bytes": 249263407104
      |    }
      |  },
      |  "host": "127.0.0.1",
      |  "ip": "127.0.0.1:9300",
      |  "jvm": {
      |    "buffer_pools": {
      |      "direct": {
      |        "count": 27,
      |        "total_capacity": "99.5mb",
      |        "total_capacity_in_bytes": 104345941,
      |        "used": "99.5mb",
      |        "used_in_bytes": 104345942
      |      },
      |      "mapped": {
      |        "count": 1,
      |        "total_capacity": "11.1kb",
      |        "total_capacity_in_bytes": 11467,
      |        "used": "11.1kb",
      |        "used_in_bytes": 11467
      |      }
      |    },
      |    "classes": {
      |      "current_loaded_count": 9948,
      |      "total_loaded_count": 9948,
      |      "total_unloaded_count": 0
      |    },
      |    "gc": {
      |      "collectors": {
      |        "old": {
      |          "collection_count": 1,
      |          "collection_time": "42ms",
      |          "collection_time_in_millis": 42
      |        },
      |        "young": {
      |          "collection_count": 2,
      |          "collection_time": "79ms",
      |          "collection_time_in_millis": 79
      |        }
      |      }
      |    },
      |    "mem": {
      |      "heap_committed": "1.9gb",
      |      "heap_committed_in_bytes": 2112618496,
      |      "heap_max": "1.9gb",
      |      "heap_max_in_bytes": 2112618496,
      |      "heap_used": "236.1mb",
      |      "heap_used_in_bytes": 247663264,
      |      "heap_used_percent": 11,
      |      "non_heap_committed": "66.3mb",
      |      "non_heap_committed_in_bytes": 69554176,
      |      "non_heap_used": "62.1mb",
      |      "non_heap_used_in_bytes": 65173488,
      |      "pools": {
      |        "old": {
      |          "max": "1.6gb",
      |          "max_in_bytes": 1798569984,
      |          "peak_max": "1.6gb",
      |          "peak_max_in_bytes": 1798569984,
      |          "peak_used": "10.2mb",
      |          "peak_used_in_bytes": 10779256,
      |          "used": "10.2mb",
      |          "used_in_bytes": 10779256
      |        },
      |        "survivor": {
      |          "max": "33.2mb",
      |          "max_in_bytes": 34865152,
      |          "peak_max": "33.2mb",
      |          "peak_max_in_bytes": 34865152,
      |          "peak_used": "33.2mb",
      |          "peak_used_in_bytes": 34865152,
      |          "used": "33.2mb",
      |          "used_in_bytes": 34865152
      |        },
      |        "young": {
      |          "max": "266.2mb",
      |          "max_in_bytes": 279183360,
      |          "peak_max": "266.2mb",
      |          "peak_max_in_bytes": 279183360,
      |          "peak_used": "266.2mb",
      |          "peak_used_in_bytes": 279183360,
      |          "used": "192.6mb",
      |          "used_in_bytes": 202018856
      |        }
      |      }
      |    },
      |    "threads": {
      |      "count": 44,
      |      "peak_count": 51
      |    },
      |    "timestamp": 1495609438814,
      |    "uptime": "1.8m",
      |    "uptime_in_millis": 109228
      |  },
      |  "name": "-qkZcMt",
      |  "os": {
      |    "cpu": {
      |      "load_average": {
      |        "1m": 1.82763671875
      |      },
      |      "percent": 3
      |    },
      |    "mem": {
      |      "free": "3.8gb",
      |      "free_in_bytes": 4124094464,
      |      "free_percent": 24,
      |      "total": "16gb",
      |      "total_in_bytes": 17179869184,
      |      "used": "12.1gb",
      |      "used_in_bytes": 13055774720,
      |      "used_percent": 76
      |    },
      |    "swap": {
      |      "free": "1.4gb",
      |      "free_in_bytes": 1521221632,
      |      "total": "2gb",
      |      "total_in_bytes": 2147483648,
      |      "used": "597.2mb",
      |      "used_in_bytes": 626262016
      |    },
      |    "timestamp": 1495609438814
      |  },
      |  "process": {
      |    "cpu": {
      |      "percent": 2,
      |      "total": "16.7s",
      |      "total_in_millis": 16768
      |    },
      |    "max_file_descriptors": 10240,
      |    "mem": {
      |      "total_virtual": "5.9gb",
      |      "total_virtual_in_bytes": 6398005248
      |    },
      |    "open_file_descriptors": 186,
      |    "timestamp": 1495609438814
      |  },
      |  "roles": [
      |    "master",
      |    "data",
      |    "ingest"
      |  ],
      |  "timestamp": 1495609438814,
      |  "transport_address": "127.0.0.1:9300"
      |}
    """.stripMargin
  )

  val awsNodeStats5 = Json.parse(
    """
      |{
      |  "fs": {
      |    "data": [
      |      {
      |        "available": "8.1gb",
      |        "available_in_bytes": 8744493056,
      |        "free": "8.6gb",
      |        "free_in_bytes": 9298141184,
      |        "spins": "false",
      |        "total": "9.7gb",
      |        "total_in_bytes": 10434699264,
      |        "type": "ext4"
      |      }
      |    ],
      |    "io_stats": {
      |      "devices": [
      |        {
      |          "device_name": "xvdf",
      |          "operations": 776907,
      |          "read_kilobytes": 243292,
      |          "read_operations": 11082,
      |          "write_kilobytes": 32952024,
      |          "write_operations": 765825
      |        }
      |      ],
      |      "total": {
      |        "operations": 776907,
      |        "read_kilobytes": 243292,
      |        "read_operations": 11082,
      |        "write_kilobytes": 32952024,
      |        "write_operations": 765825
      |      }
      |    },
      |    "timestamp": 1495609672305,
      |    "total": {
      |      "available": "8.1gb",
      |      "available_in_bytes": 8744493056,
      |      "free": "8.6gb",
      |      "free_in_bytes": 9298141184,
      |      "total": "9.7gb",
      |      "total_in_bytes": 10434699264
      |    }
      |  },
      |  "jvm": {
      |    "buffer_pools": {
      |      "direct": {
      |        "count": 149,
      |        "total_capacity": "69.3mb",
      |        "total_capacity_in_bytes": 72703473,
      |        "used": "69.3mb",
      |        "used_in_bytes": 72703474
      |      },
      |      "mapped": {
      |        "count": 1127,
      |        "total_capacity": "1gb",
      |        "total_capacity_in_bytes": 1079169406,
      |        "used": "1gb",
      |        "used_in_bytes": 1079169406
      |      }
      |    },
      |    "classes": {
      |      "current_loaded_count": 19949,
      |      "total_loaded_count": 20045,
      |      "total_unloaded_count": 96
      |    },
      |    "gc": {
      |      "collectors": {
      |        "old": {
      |          "collection_count": 12,
      |          "collection_time": "2.9s",
      |          "collection_time_in_millis": 2931
      |        },
      |        "young": {
      |          "collection_count": 10482,
      |          "collection_time": "2m",
      |          "collection_time_in_millis": 125284
      |        }
      |      }
      |    },
      |    "mem": {
      |      "heap_committed": "1.9gb",
      |      "heap_committed_in_bytes": 2130051072,
      |      "heap_max": "1.9gb",
      |      "heap_max_in_bytes": 2130051072,
      |      "heap_used": "629.2mb",
      |      "heap_used_in_bytes": 659820384,
      |      "heap_used_percent": 30,
      |      "non_heap_committed": "221.4mb",
      |      "non_heap_committed_in_bytes": 232173568,
      |      "non_heap_used": "214mb",
      |      "non_heap_used_in_bytes": 224462688,
      |      "pools": {
      |        "old": {
      |          "max": "1.8gb",
      |          "max_in_bytes": 1973026816,
      |          "peak_max": "1.8gb",
      |          "peak_max_in_bytes": 1973026816,
      |          "peak_used": "1.5gb",
      |          "peak_used_in_bytes": 1629264184,
      |          "used": "555.4mb",
      |          "used_in_bytes": 582379832
      |        },
      |        "survivor": {
      |          "max": "16.6mb",
      |          "max_in_bytes": 17432576,
      |          "peak_max": "16.6mb",
      |          "peak_max_in_bytes": 17432576,
      |          "peak_used": "16.6mb",
      |          "peak_used_in_bytes": 17432576,
      |          "used": "6.4mb",
      |          "used_in_bytes": 6730120
      |        },
      |        "young": {
      |          "max": "133.1mb",
      |          "max_in_bytes": 139591680,
      |          "peak_max": "133.1mb",
      |          "peak_max_in_bytes": 139591680,
      |          "peak_used": "133.1mb",
      |          "peak_used_in_bytes": 139591680,
      |          "used": "67.4mb",
      |          "used_in_bytes": 70710432
      |        }
      |      }
      |    },
      |    "threads": {
      |      "count": 62,
      |      "peak_count": 79
      |    },
      |    "timestamp": 1495609672305,
      |    "uptime": "5.7d",
      |    "uptime_in_millis": 492790575
      |  },
      |  "name": "007ywNv",
      |  "os": {
      |    "cpu": {
      |      "load_average": {
      |        "15m": 0.05,
      |        "1m": 0.02,
      |        "5m": 0.02
      |      },
      |      "percent": 0
      |    },
      |    "mem": {
      |      "free": "127.2mb",
      |      "free_in_bytes": 133480448,
      |      "free_percent": 3,
      |      "total": "3.8gb",
      |      "total_in_bytes": 4147183616,
      |      "used": "3.7gb",
      |      "used_in_bytes": 4013703168,
      |      "used_percent": 97
      |    },
      |    "swap": {
      |      "free": "965.1mb",
      |      "free_in_bytes": 1012023296,
      |      "total": "1023.9mb",
      |      "total_in_bytes": 1073737728,
      |      "used": "58.8mb",
      |      "used_in_bytes": 61714432
      |    },
      |    "timestamp": 1495609672304
      |  },
      |  "process": {
      |    "cpu": {
      |      "percent": 0,
      |      "total": "1.9h",
      |      "total_in_millis": 6988190
      |    },
      |    "max_file_descriptors": 128000,
      |    "mem": {
      |      "total_virtual": "5.5gb",
      |      "total_virtual_in_bytes": 5995511808
      |    },
      |    "open_file_descriptors": 721,
      |    "timestamp": 1495609672304
      |  },
      |  "roles": [
      |    "master",
      |    "data",
      |    "ingest"
      |  ],
      |  "timestamp": 1495609672303
      |}
    """.stripMargin
  )

}
