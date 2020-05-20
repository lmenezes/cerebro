package models.overview

import play.api.libs.json.Json

trait ClusterWithData extends ClusterStub {

  val clusterState = Json.parse(
    """
      |{
      |  "cluster_name": "elasticsearch",
      |  "master_node": "cPsT9o5FQ3WRnvqSTXHiVQ",
      |  "blocks" : {
      |    "indices" : {
      |      "foo" : {
      |        "4" : {
      |          "description" : "index closed",
      |          "retryable" : false,
      |          "levels" : [ "read", "write" ]
      |        }
      |      }
      |    }
      |  },
      |  "routing_table": {
      |    "indices": {
      |      "bar": {
      |        "shards": {
      |          "0": [
      |            {
      |              "state": "STARTED",
      |              "primary": false,
      |              "node": "MoDcZdJkQGK2RpYTvJhQlA",
      |              "relocating_node": null,
      |              "shard": 0,
      |              "index": "bar",
      |              "version": 3,
      |              "allocation_id": {
      |                "id": "ns_A3bOnS26LHP9aMMoNqQ"
      |              }
      |            },
      |            {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "cPsT9o5FQ3WRnvqSTXHiVQ",
      |              "relocating_node": null,
      |              "shard": 0,
      |              "index": "bar",
      |              "version": 3,
      |              "allocation_id": {
      |                "id": "KpTuITnDRju5huuD7K42JQ"
      |              }
      |            }
      |          ]
      |        }
      |      },
      |      ".foobar": {
      |        "shards": {
      |          "0": [
      |            {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "MoDcZdJkQGK2RpYTvJhQlA",
      |              "relocating_node": null,
      |              "shard": 0,
      |              "index": ".foobar",
      |              "version": 2,
      |              "allocation_id": {
      |                "id": "av2CBQ7ZR6mpYP4hN45SFQ"
      |              }
      |            }
      |          ],
      |          "1": [
      |            {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "cPsT9o5FQ3WRnvqSTXHiVQ",
      |              "relocating_node": null,
      |              "shard": 1,
      |              "index": ".foobar",
      |              "version": 2,
      |              "allocation_id": {
      |                "id": "WA41NgmPRdyuV1Bdf3xAIw"
      |              }
      |            }
      |          ],
      |          "2": [
      |            {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "MoDcZdJkQGK2RpYTvJhQlA",
      |              "relocating_node": null,
      |              "shard": 2,
      |              "index": ".foobar",
      |              "version": 2,
      |              "allocation_id": {
      |                "id": "9i-1Ze0iTyyGreKtd6uNlQ"
      |              }
      |            }
      |          ],
      |          "3": [
      |            {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "cPsT9o5FQ3WRnvqSTXHiVQ",
      |              "relocating_node": null,
      |              "shard": 3,
      |              "index": ".foobar",
      |              "version": 2,
      |              "allocation_id": {
      |                "id": "QqhRDD_DST6P0By3QaKjug"
      |              }
      |            }
      |          ],
      |          "4": [
      |            {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "MoDcZdJkQGK2RpYTvJhQlA",
      |              "relocating_node": null,
      |              "shard": 4,
      |              "index": ".foobar",
      |              "version": 2,
      |              "allocation_id": {
      |                "id": "w30rCs_vRIeWWNdPD6yinA"
      |              }
      |            }
      |          ]
      |        }
      |      }
      |    }
      |  }
      |}
    """.stripMargin
  )

  val nodesStats = Json.parse(
    """
      |{
      |  "cluster_name": "elasticsearch",
      |  "nodes": {
      |    "MoDcZdJkQGK2RpYTvJhQlA": {
      |      "timestamp": 1458349671429,
      |      "name": "Solara",
      |      "transport_address": "127.0.0.1:9301",
      |      "host": "127.0.0.1",
      |      "ip": [
      |        "127.0.0.1:9301",
      |        "NONE"
      |      ],
      |      "os": {
      |        "timestamp": 1458349670762,
      |        "load_average": 3.34326171875,
      |        "mem": {
      |          "total_in_bytes": 8589934592,
      |          "free_in_bytes": 33009664,
      |          "used_in_bytes": 8556924928,
      |          "free_percent": 0,
      |          "used_percent": 100
      |        },
      |        "swap": {
      |          "total_in_bytes": 2147483648,
      |          "free_in_bytes": 1729626112,
      |          "used_in_bytes": 417857536
      |        }
      |      },
      |      "process": {
      |        "timestamp": 1458349670762,
      |        "open_file_descriptors": 271,
      |        "max_file_descriptors": 10240,
      |        "cpu": {
      |          "percent": 0,
      |          "total_in_millis": 46412
      |        },
      |        "mem": {
      |          "total_virtual_in_bytes": 5282828288
      |        }
      |      },
      |      "jvm": {
      |        "timestamp": 1458349670762,
      |        "uptime_in_millis": 4187845,
      |        "mem": {
      |          "heap_used_in_bytes": 86912928,
      |          "heap_used_percent": 8,
      |          "heap_committed_in_bytes": 259522560,
      |          "heap_max_in_bytes": 1037959168,
      |          "non_heap_used_in_bytes": 54344920,
      |          "non_heap_committed_in_bytes": 55156736,
      |          "pools": {
      |            "young": {
      |              "used_in_bytes": 67421744,
      |              "max_in_bytes": 286326784,
      |              "peak_used_in_bytes": 71630848,
      |              "peak_max_in_bytes": 286326784
      |            },
      |            "survivor": {
      |              "used_in_bytes": 6942440,
      |              "max_in_bytes": 35782656,
      |              "peak_used_in_bytes": 8912888,
      |              "peak_max_in_bytes": 35782656
      |            },
      |            "old": {
      |              "used_in_bytes": 12548744,
      |              "max_in_bytes": 715849728,
      |              "peak_used_in_bytes": 12548744,
      |              "peak_max_in_bytes": 715849728
      |            }
      |          }
      |        },
      |        "threads": {
      |          "count": 71,
      |          "peak_count": 87
      |        },
      |        "gc": {
      |          "collectors": {
      |            "young": {
      |              "collection_count": 5,
      |              "collection_time_in_millis": 76
      |            },
      |            "old": {
      |              "collection_count": 1,
      |              "collection_time_in_millis": 18
      |            }
      |          }
      |        },
      |        "buffer_pools": {
      |          "direct": {
      |            "count": 79,
      |            "used_in_bytes": 14167303,
      |            "total_capacity_in_bytes": 14167303
      |          },
      |          "mapped": {
      |            "count": 0,
      |            "used_in_bytes": 0,
      |            "total_capacity_in_bytes": 0
      |          }
      |        }
      |      },
      |      "fs": {
      |        "timestamp": 1458349670762,
      |        "total": {
      |          "total_in_bytes": 249804886016,
      |          "free_in_bytes": 41525211136,
      |          "available_in_bytes": 41263067136
      |        },
      |        "data": [
      |          {
      |            "path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/1",
      |            "mount": "/ (/dev/disk1)",
      |            "type": "hfs",
      |            "total_in_bytes": 249804886016,
      |            "free_in_bytes": 41525211136,
      |            "available_in_bytes": 41263067136
      |          }
      |        ]
      |      }
      |    },
      |    "cPsT9o5FQ3WRnvqSTXHiVQ": {
      |      "timestamp": 1458349671429,
      |      "name": "Cecilia Reyes",
      |      "transport_address": "127.0.0.1:9300",
      |      "host": "127.0.0.1",
      |      "ip": [
      |        "127.0.0.1:9300",
      |        "NONE"
      |      ],
      |      "os": {
      |        "timestamp": 1458349670762,
      |        "load_average": 3.34326171875,
      |        "mem": {
      |          "total_in_bytes": 8589934592,
      |          "free_in_bytes": 33009664,
      |          "used_in_bytes": 8556924928,
      |          "free_percent": 0,
      |          "used_percent": 100
      |        },
      |        "swap": {
      |          "total_in_bytes": 2147483648,
      |          "free_in_bytes": 1729626112,
      |          "used_in_bytes": 417857536
      |        }
      |      },
      |      "process": {
      |        "timestamp": 1458349670762,
      |        "open_file_descriptors": 280,
      |        "max_file_descriptors": 10240,
      |        "cpu": {
      |          "percent": 0,
      |          "total_in_millis": 49096
      |        },
      |        "mem": {
      |          "total_virtual_in_bytes": 5301309440
      |        }
      |      },
      |      "jvm": {
      |        "timestamp": 1458349670762,
      |        "uptime_in_millis": 4196395,
      |        "mem": {
      |          "heap_used_in_bytes": 70134792,
      |          "heap_used_percent": 6,
      |          "heap_committed_in_bytes": 259522560,
      |          "heap_max_in_bytes": 1037959168,
      |          "non_heap_used_in_bytes": 61118128,
      |          "non_heap_committed_in_bytes": 62324736,
      |          "pools": {
      |            "young": {
      |              "used_in_bytes": 52733792,
      |              "max_in_bytes": 286326784,
      |              "peak_used_in_bytes": 71630848,
      |              "peak_max_in_bytes": 286326784
      |            },
      |            "survivor": {
      |              "used_in_bytes": 2375848,
      |              "max_in_bytes": 35782656,
      |              "peak_used_in_bytes": 8912896,
      |              "peak_max_in_bytes": 35782656
      |            },
      |            "old": {
      |              "used_in_bytes": 15025152,
      |              "max_in_bytes": 715849728,
      |              "peak_used_in_bytes": 15025152,
      |              "peak_max_in_bytes": 715849728
      |            }
      |          }
      |        },
      |        "threads": {
      |          "count": 77,
      |          "peak_count": 106
      |        },
      |        "gc": {
      |          "collectors": {
      |            "young": {
      |              "collection_count": 7,
      |              "collection_time_in_millis": 93
      |            },
      |            "old": {
      |              "collection_count": 1,
      |              "collection_time_in_millis": 12
      |            }
      |          }
      |        },
      |        "buffer_pools": {
      |          "direct": {
      |            "count": 153,
      |            "used_in_bytes": 23280699,
      |            "total_capacity_in_bytes": 23280699
      |          },
      |          "mapped": {
      |            "count": 0,
      |            "used_in_bytes": 0,
      |            "total_capacity_in_bytes": 0
      |          }
      |        },
      |        "classes": {
      |          "current_loaded_count": 7446,
      |          "total_loaded_count": 7446,
      |          "total_unloaded_count": 0
      |        }
      |      },
      |      "fs": {
      |        "timestamp": 1458349670762,
      |        "total": {
      |          "total_in_bytes": 249804886016,
      |          "free_in_bytes": 41525211136,
      |          "available_in_bytes": 41263067136
      |        },
      |        "data": [
      |          {
      |            "path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/0",
      |            "mount": "/ (/dev/disk1)",
      |            "type": "hfs",
      |            "total_in_bytes": 249804886016,
      |            "free_in_bytes": 41525211136,
      |            "available_in_bytes": 41263067136
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
      |  "_shards": {
      |    "total": 11,
      |    "successful": 11,
      |    "failed": 0
      |  },
      |  "_all": {
      |    "primaries": {
      |      "docs": {
      |        "count": 3,
      |        "deleted": 0
      |      },
      |      "store": {
      |        "size_in_bytes": 9902,
      |        "throttle_time_in_millis": 0
      |      }
      |    },
      |    "total": {
      |      "docs": {
      |        "count": 5,
      |        "deleted": 0
      |      },
      |      "store": {
      |        "size_in_bytes": 16184,
      |        "throttle_time_in_millis": 0
      |      }
      |    }
      |  },
      |  "indices": {
      |    "bar": {
      |      "primaries": {
      |        "docs": {
      |          "count": 1,
      |          "deleted": 0
      |        },
      |        "store": {
      |          "size_in_bytes": 3076,
      |          "throttle_time_in_millis": 0
      |        }
      |      },
      |      "total": {
      |        "docs": {
      |          "count": 2,
      |          "deleted": 0
      |        },
      |        "store": {
      |          "size_in_bytes": 6152,
      |          "throttle_time_in_millis": 0
      |        }
      |      }
      |    },
      |    ".foobar": {
      |      "primaries": {
      |        "docs": {
      |          "count": 1,
      |          "deleted": 0
      |        },
      |        "store": {
      |          "size_in_bytes": 3620,
      |          "throttle_time_in_millis": 0
      |        }
      |      },
      |      "total": {
      |        "docs": {
      |          "count": 1,
      |          "deleted": 0
      |        },
      |        "store": {
      |          "size_in_bytes": 3620,
      |          "throttle_time_in_millis": 0
      |        }
      |      }
      |    }
      |  }
      |}
    """.stripMargin
  )

  val clusterSettings = Json.parse(
    """
      |{
      |  "persistent": {},
      |  "transient": {}
      |}
    """.stripMargin
  )

  val aliases = Json.parse(
    """
      |{
      |  "bar": {
      |    "aliases": {
      |      "active": {}
      |    }
      |  },
      |  ".foobar": {
      |    "aliases": {}
      |  }
      |}
    """.stripMargin
  )

  val clusterHealth = Json.parse(
    """
      |{
      |  "cluster_name": "elasticsearch",
      |  "status": "green",
      |  "timed_out": false,
      |  "number_of_nodes": 2,
      |  "number_of_data_nodes": 2,
      |  "active_primary_shards": 8,
      |  "active_shards": 11,
      |  "relocating_shards": 0,
      |  "initializing_shards": 0,
      |  "unassigned_shards": 0,
      |  "delayed_unassigned_shards": 0,
      |  "number_of_pending_tasks": 0,
      |  "number_of_in_flight_fetch": 0,
      |  "task_max_waiting_in_queue_millis": 0,
      |  "active_shards_percent_as_number": 100
      |}
    """.stripMargin
  )

  val nodes = Json.parse(
    """
      |{
      |  "cluster_name": "elasticsearch",
      |  "nodes": {
      |    "MoDcZdJkQGK2RpYTvJhQlA": {
      |      "name": "Solara",
      |      "transport_address": "127.0.0.1:9301",
      |      "host": "127.0.0.1",
      |      "ip": "127.0.0.1",
      |      "version": "2.1.0",
      |      "build": "72cd1f1",
      |      "http_address": "127.0.0.1:9201",
      |      "attributes": {
      |        "aws_availability_zone": "eu-west-1c",
      |        "node_type": "warm",
      |        "xpack.installed": "true"
      |      },
      |      "os": {
      |        "refresh_interval_in_millis": 1000,
      |        "available_processors": 8,
      |        "allocated_processors": 8
      |      },
      |      "jvm": {
      |        "pid": 60238,
      |        "version": "1.8.0_72",
      |        "vm_name": "Java HotSpot(TM) 64-Bit Server VM",
      |        "vm_version": "25.72-b15",
      |        "vm_vendor": "Oracle Corporation",
      |        "start_time_in_millis": 1458345483045,
      |        "mem": {
      |          "heap_init_in_bytes": 268435456,
      |          "heap_max_in_bytes": 1037959168,
      |          "non_heap_init_in_bytes": 2555904,
      |          "non_heap_max_in_bytes": 0,
      |          "direct_max_in_bytes": 1037959168
      |        },
      |        "gc_collectors": [
      |          "ParNew",
      |          "ConcurrentMarkSweep"
      |        ],
      |        "memory_pools": [
      |          "Code Cache",
      |          "Metaspace",
      |          "Compressed Class Space",
      |          "Par Eden Space",
      |          "Par Survivor Space",
      |          "CMS Old Gen"
      |        ]
      |      }
      |    },
      |    "cPsT9o5FQ3WRnvqSTXHiVQ": {
      |      "name": "Cecilia Reyes",
      |      "transport_address": "127.0.0.1:9300",
      |      "host": "127.0.0.1",
      |      "ip": "127.0.0.1",
      |      "version": "2.1.0",
      |      "build": "72cd1f1",
      |      "http_address": "127.0.0.1:9200",
      |      "attributes": {
      |        "aws_availability_zone": "eu-west-1c",
      |        "node_type": "warm",
      |        "xpack.installed": "true"
      |      },
      |      "os": {
      |        "refresh_interval_in_millis": 1000,
      |        "name": "Mac OS X",
      |        "arch": "x86_64",
      |        "version": "10.11.3",
      |        "available_processors": 8,
      |        "allocated_processors": 8
      |      },
      |      "jvm": {
      |        "pid": 60169,
      |        "version": "1.8.0_72",
      |        "vm_name": "Java HotSpot(TM) 64-Bit Server VM",
      |        "vm_version": "25.72-b15",
      |        "vm_vendor": "Oracle Corporation",
      |        "start_time_in_millis": 1458345474505,
      |        "mem": {
      |          "heap_init_in_bytes": 268435456,
      |          "heap_max_in_bytes": 1037959168,
      |          "non_heap_init_in_bytes": 2555904,
      |          "non_heap_max_in_bytes": 0,
      |          "direct_max_in_bytes": 1037959168
      |        },
      |        "gc_collectors": [
      |          "ParNew",
      |          "ConcurrentMarkSweep"
      |        ],
      |        "memory_pools": [
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
      |  "name": "Cecilia Reyes",
      |  "cluster_name": "elasticsearch",
      |  "version": {
      |    "number": "2.1.0",
      |    "build_hash": "72cd1f1a3eee09505e036106146dc1949dc5dc87",
      |    "build_timestamp": "2015-11-18T22:40:03Z",
      |    "build_snapshot": false,
      |    "lucene_version": "5.3.1"
      |  },
      |  "tagline": "You Know, for Search"
      |}
    """.stripMargin
  )

}

object ClusterWithData extends ClusterWithData
