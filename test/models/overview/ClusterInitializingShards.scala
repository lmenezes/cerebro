package models.overview

import play.api.libs.json.Json

object ClusterInitializingShards {

  def apply() = ClusterOverview(clusterState, nodesStats, indicesStats, clusterSettings, aliases, clusterHealth, nodes)

  val clusterState = Json.parse(
    """
      |{
      |  "cluster_name" : "elasticsearch",
      |  "master_node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |  "blocks" : { },
      |  "routing_table" : {
      |    "indices" : {
      |      "hello" : {
      |        "shards" : {
      |          "1" : [ {
      |            "state" : "INITIALIZING",
      |            "primary" : false,
      |            "node" : "VOiMU2k5SuStH3-X1uuBGw",
      |            "relocating_node" : null,
      |            "shard" : 1,
      |            "index" : "hello",
      |            "version" : 16,
      |            "allocation_id" : {
      |              "id" : "rNdtAPz_RhKVBp6dpAH1cw"
      |            },
      |            "unassigned_info" : {
      |              "reason" : "REPLICA_ADDED",
      |              "at" : "2016-03-19T14:13:39.833Z"
      |            }
      |          }, {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 1,
      |            "index" : "hello",
      |            "version" : 16,
      |            "allocation_id" : {
      |              "id" : "hlwc94lZRvOoBoaxyEWIGg"
      |            }
      |          } ],
      |          "4" : [ {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 4,
      |            "index" : "hello",
      |            "version" : 10,
      |            "allocation_id" : {
      |              "id" : "Kyne0gDVQEasq9VxUUsxbg"
      |            }
      |          }, {
      |            "state" : "UNASSIGNED",
      |            "primary" : false,
      |            "node" : null,
      |            "relocating_node" : null,
      |            "shard" : 4,
      |            "index" : "hello",
      |            "version" : 10,
      |            "unassigned_info" : {
      |              "reason" : "REPLICA_ADDED",
      |              "at" : "2016-03-19T14:13:39.833Z"
      |            }
      |          } ],
      |          "2" : [ {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "VOiMU2k5SuStH3-X1uuBGw",
      |            "relocating_node" : null,
      |            "shard" : 2,
      |            "index" : "hello",
      |            "version" : 15,
      |            "allocation_id" : {
      |              "id" : "rN62kibSRZq0RxcwxEHKKw"
      |            }
      |          }, {
      |            "state" : "INITIALIZING",
      |            "primary" : false,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 2,
      |            "index" : "hello",
      |            "version" : 15,
      |            "allocation_id" : {
      |              "id" : "2G3Hs3CnT5uvhpeOmHZyYg"
      |            },
      |            "unassigned_info" : {
      |              "reason" : "REPLICA_ADDED",
      |              "at" : "2016-03-19T14:13:39.833Z"
      |            }
      |          } ],
      |          "3" : [ {
      |            "state" : "INITIALIZING",
      |            "primary" : false,
      |            "node" : "VOiMU2k5SuStH3-X1uuBGw",
      |            "relocating_node" : null,
      |            "shard" : 3,
      |            "index" : "hello",
      |            "version" : 11,
      |            "allocation_id" : {
      |              "id" : "NhG91IW6RCW1KAbSx67O9g"
      |            },
      |            "unassigned_info" : {
      |              "reason" : "REPLICA_ADDED",
      |              "at" : "2016-03-19T14:13:39.833Z"
      |            }
      |          }, {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 3,
      |            "index" : "hello",
      |            "version" : 11,
      |            "allocation_id" : {
      |              "id" : "b4Gdtk7uTuSINaZ_YdaJdg"
      |            }
      |          } ],
      |          "0" : [ {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "VOiMU2k5SuStH3-X1uuBGw",
      |            "relocating_node" : null,
      |            "shard" : 0,
      |            "index" : "hello",
      |            "version" : 17,
      |            "allocation_id" : {
      |              "id" : "13mrI6FhRjGEk7xG7xYJvg"
      |            }
      |          }, {
      |            "state" : "INITIALIZING",
      |            "primary" : false,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 0,
      |            "index" : "hello",
      |            "version" : 17,
      |            "allocation_id" : {
      |              "id" : "FbfzrPiySEaOzGMRZRDf7w"
      |            },
      |            "unassigned_info" : {
      |              "reason" : "REPLICA_ADDED",
      |              "at" : "2016-03-19T14:13:39.833Z"
      |            }
      |          } ]
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
      |  "cluster_name" : "elasticsearch",
      |  "nodes" : {
      |    "VOiMU2k5SuStH3-X1uuBGw" : {
      |      "timestamp" : 1458396821721,
      |      "name" : "Random",
      |      "transport_address" : "127.0.0.1:9301",
      |      "host" : "127.0.0.1",
      |      "ip" : [ "127.0.0.1:9301", "NONE" ],
      |      "os" : {
      |        "timestamp" : 1458396821721,
      |        "load_average" : 3.48583984375,
      |        "mem" : {
      |          "total_in_bytes" : 8589934592,
      |          "free_in_bytes" : 57360384,
      |          "used_in_bytes" : 8532574208,
      |          "free_percent" : 1,
      |          "used_percent" : 99
      |        },
      |        "swap" : {
      |          "total_in_bytes" : 2147483648,
      |          "free_in_bytes" : 1292369920,
      |          "used_in_bytes" : 855113728
      |        }
      |      },
      |      "process" : {
      |        "timestamp" : 1458396821721,
      |        "open_file_descriptors" : 283,
      |        "max_file_descriptors" : 10240,
      |        "cpu" : {
      |          "percent" : 0,
      |          "total_in_millis" : 204184
      |        },
      |        "mem" : {
      |          "total_virtual_in_bytes" : 5328396288
      |        }
      |      },
      |      "jvm" : {
      |        "timestamp" : 1458396821721,
      |        "uptime_in_millis" : 1013104,
      |        "mem" : {
      |          "heap_used_in_bytes" : 65155904,
      |          "heap_used_percent" : 6,
      |          "heap_committed_in_bytes" : 259522560,
      |          "heap_max_in_bytes" : 1037959168,
      |          "non_heap_used_in_bytes" : 68894384,
      |          "non_heap_committed_in_bytes" : 70033408,
      |          "pools" : {
      |            "young" : {
      |              "used_in_bytes" : 17017328,
      |              "max_in_bytes" : 286326784,
      |              "peak_used_in_bytes" : 71630848,
      |              "peak_max_in_bytes" : 286326784
      |            },
      |            "survivor" : {
      |              "used_in_bytes" : 2022296,
      |              "max_in_bytes" : 35782656,
      |              "peak_used_in_bytes" : 8912896,
      |              "peak_max_in_bytes" : 35782656
      |            },
      |            "old" : {
      |              "used_in_bytes" : 46116280,
      |              "max_in_bytes" : 715849728,
      |              "peak_used_in_bytes" : 46116280,
      |              "peak_max_in_bytes" : 715849728
      |            }
      |          }
      |        },
      |        "threads" : {
      |          "count" : 99,
      |          "peak_count" : 103
      |        },
      |        "gc" : {
      |          "collectors" : {
      |            "young" : {
      |              "collection_count" : 173,
      |              "collection_time_in_millis" : 861
      |            },
      |            "old" : {
      |              "collection_count" : 1,
      |              "collection_time_in_millis" : 16
      |            }
      |          }
      |        },
      |        "buffer_pools" : {
      |          "direct" : {
      |            "count" : 126,
      |            "used_in_bytes" : 20107771,
      |            "total_capacity_in_bytes" : 20107771
      |          },
      |          "mapped" : {
      |            "count" : 7,
      |            "used_in_bytes" : 531368,
      |            "total_capacity_in_bytes" : 531368
      |          }
      |        }
      |      },
      |      "fs" : {
      |        "timestamp" : 1458396821721,
      |        "total" : {
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 41476603904,
      |          "available_in_bytes" : 41214459904
      |        },
      |        "data" : [ {
      |          "path" : "/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/1",
      |          "mount" : "/ (/dev/disk1)",
      |          "type" : "hfs",
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 41476603904,
      |          "available_in_bytes" : 41214459904
      |        } ]
      |      }
      |    },
      |    "cPsT9o5FQ3WRnvqSTXHiVQ" : {
      |      "timestamp" : 1458396821720,
      |      "name" : "Cecilia Reyes",
      |      "transport_address" : "127.0.0.1:9300",
      |      "host" : "127.0.0.1",
      |      "ip" : [ "127.0.0.1:9300", "NONE" ],
      |      "os" : {
      |        "timestamp" : 1458396821720,
      |        "load_average" : 3.48583984375,
      |        "mem" : {
      |          "total_in_bytes" : 8589934592,
      |          "free_in_bytes" : 57360384,
      |          "used_in_bytes" : 8532574208,
      |          "free_percent" : 1,
      |          "used_percent" : 99
      |        },
      |        "swap" : {
      |          "total_in_bytes" : 2147483648,
      |          "free_in_bytes" : 1292369920,
      |          "used_in_bytes" : 855113728
      |        }
      |      },
      |      "process" : {
      |        "timestamp" : 1458396821720,
      |        "open_file_descriptors" : 309,
      |        "max_file_descriptors" : 10240,
      |        "cpu" : {
      |          "percent" : 0,
      |          "total_in_millis" : 439157
      |        },
      |        "mem" : {
      |          "total_virtual_in_bytes" : 5336465408
      |        }
      |      },
      |      "jvm" : {
      |        "timestamp" : 1458396821721,
      |        "uptime_in_millis" : 12257739,
      |        "mem" : {
      |          "heap_used_in_bytes" : 152293128,
      |          "heap_used_percent" : 14,
      |          "heap_committed_in_bytes" : 259522560,
      |          "heap_max_in_bytes" : 1037959168,
      |          "non_heap_used_in_bytes" : 80998704,
      |          "non_heap_committed_in_bytes" : 82624512,
      |          "pools" : {
      |            "young" : {
      |              "used_in_bytes" : 42576208,
      |              "max_in_bytes" : 286326784,
      |              "peak_used_in_bytes" : 71630848,
      |              "peak_max_in_bytes" : 286326784
      |            },
      |            "survivor" : {
      |              "used_in_bytes" : 4755944,
      |              "max_in_bytes" : 35782656,
      |              "peak_used_in_bytes" : 8912896,
      |              "peak_max_in_bytes" : 35782656
      |            },
      |            "old" : {
      |              "used_in_bytes" : 104965192,
      |              "max_in_bytes" : 715849728,
      |              "peak_used_in_bytes" : 104965192,
      |              "peak_max_in_bytes" : 715849728
      |            }
      |          }
      |        },
      |        "threads" : {
      |          "count" : 102,
      |          "peak_count" : 106
      |        },
      |        "gc" : {
      |          "collectors" : {
      |            "young" : {
      |              "collection_count" : 252,
      |              "collection_time_in_millis" : 1611
      |            },
      |            "old" : {
      |              "collection_count" : 1,
      |              "collection_time_in_millis" : 12
      |            }
      |          }
      |        },
      |        "buffer_pools" : {
      |          "direct" : {
      |            "count" : 206,
      |            "used_in_bytes" : 28678155,
      |            "total_capacity_in_bytes" : 28678155
      |          },
      |          "mapped" : {
      |            "count" : 9,
      |            "used_in_bytes" : 536675,
      |            "total_capacity_in_bytes" : 536675
      |          }
      |        },
      |        "classes" : {
      |          "current_loaded_count" : 7623,
      |          "total_loaded_count" : 7623,
      |          "total_unloaded_count" : 0
      |        }
      |      },
      |      "fs" : {
      |        "timestamp" : 1458396821721,
      |        "total" : {
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 41476603904,
      |          "available_in_bytes" : 41214459904
      |        },
      |        "data" : [ {
      |          "path" : "/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/0",
      |          "mount" : "/ (/dev/disk1)",
      |          "type" : "hfs",
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 41476603904,
      |          "available_in_bytes" : 41214459904
      |        } ]
      |      }
      |    }
      |  }
      |}
    """.stripMargin
  )

  val indicesStats = Json.parse(
    """
      |{
      |  "_shards" : {
      |    "total" : 10,
      |    "successful" : 5,
      |    "failed" : 0
      |  },
      |  "_all" : {
      |    "primaries" : {
      |      "docs" : {
      |        "count" : 108680,
      |        "deleted" : 0
      |      },
      |      "store" : {
      |        "size_in_bytes" : 2026271,
      |        "throttle_time_in_millis" : 0
      |      }
      |    },
      |    "total" : {
      |      "docs" : {
      |        "count" : 108680,
      |        "deleted" : 0
      |      },
      |      "store" : {
      |        "size_in_bytes" : 2026271,
      |        "throttle_time_in_millis" : 0
      |      }
      |    }
      |  },
      |  "indices" : {
      |    "hello" : {
      |      "primaries" : {
      |        "docs" : {
      |          "count" : 108680,
      |          "deleted" : 0
      |        },
      |        "store" : {
      |          "size_in_bytes" : 2026271,
      |          "throttle_time_in_millis" : 0
      |        }
      |      },
      |      "total" : {
      |        "docs" : {
      |          "count" : 108680,
      |          "deleted" : 0
      |        },
      |        "store" : {
      |          "size_in_bytes" : 2026271,
      |          "throttle_time_in_millis" : 0
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
      |  "persistent" : { },
      |  "transient" : { }
      |}
    """.stripMargin
  )

  val aliases = Json.parse(
    """
      |{
      |  "hello" : {
      |    "aliases" : { }
      |  }
      |}
    """.stripMargin
  )

  val clusterHealth = Json.parse(
    """
      |{
      |  "cluster_name" : "elasticsearch",
      |  "status" : "yellow",
      |  "timed_out" : false,
      |  "number_of_nodes" : 2,
      |  "number_of_data_nodes" : 2,
      |  "active_primary_shards" : 5,
      |  "active_shards" : 5,
      |  "relocating_shards" : 0,
      |  "initializing_shards" : 4,
      |  "unassigned_shards" : 1,
      |  "delayed_unassigned_shards" : 0,
      |  "number_of_pending_tasks" : 0,
      |  "number_of_in_flight_fetch" : 0,
      |  "task_max_waiting_in_queue_millis" : 0,
      |  "active_shards_percent_as_number" : 50
      |}
    """.stripMargin
  )

  val nodes = Json.parse(
    """
      |{
      |  "cluster_name" : "elasticsearch",
      |  "nodes" : {
      |    "VOiMU2k5SuStH3-X1uuBGw" : {
      |      "name" : "Random",
      |      "transport_address" : "127.0.0.1:9301",
      |      "host" : "127.0.0.1",
      |      "ip" : "127.0.0.1",
      |      "version" : "2.1.0",
      |      "build" : "72cd1f1",
      |      "http_address" : "127.0.0.1:9201",
      |      "attributes": {
      |        "aws_availability_zone": "eu-west-1c",
      |        "node_type": "warm",
      |        "xpack.installed": "true"
      |      },
      |      "os" : {
      |        "refresh_interval_in_millis" : 1000,
      |        "available_processors" : 8,
      |        "allocated_processors" : 8
      |      },
      |      "jvm" : {
      |        "pid" : 16419,
      |        "version" : "1.8.0_72",
      |        "vm_name" : "Java HotSpot(TM) 64-Bit Server VM",
      |        "vm_version" : "25.72-b15",
      |        "vm_vendor" : "Oracle Corporation",
      |        "start_time_in_millis" : 1458393717991,
      |        "mem" : {
      |          "heap_init_in_bytes" : 268435456,
      |          "heap_max_in_bytes" : 1037959168,
      |          "non_heap_init_in_bytes" : 2555904,
      |          "non_heap_max_in_bytes" : 0,
      |          "direct_max_in_bytes" : 1037959168
      |        },
      |        "gc_collectors" : [ "ParNew", "ConcurrentMarkSweep" ],
      |        "memory_pools" : [ "Code Cache", "Metaspace", "Compressed Class Space", "Par Eden Space", "Par Survivor Space", "CMS Old Gen" ]
      |      }
      |    },
      |    "cPsT9o5FQ3WRnvqSTXHiVQ" : {
      |      "name" : "Cecilia Reyes",
      |      "transport_address" : "127.0.0.1:9300",
      |      "host" : "127.0.0.1",
      |      "ip" : "127.0.0.1",
      |      "version" : "2.1.0",
      |      "build" : "72cd1f1",
      |      "http_address" : "127.0.0.1:9200",
      |      "attributes": {
      |        "aws_availability_zone": "eu-west-1c",
      |        "node_type": "warm",
      |        "xpack.installed": "true"
      |      },
      |      "os" : {
      |        "refresh_interval_in_millis" : 1000,
      |        "name" : "Mac OS X",
      |        "arch" : "x86_64",
      |        "version" : "10.11.3",
      |        "available_processors" : 8,
      |        "allocated_processors" : 8
      |      },
      |      "jvm" : {
      |        "pid" : 60169,
      |        "version" : "1.8.0_72",
      |        "vm_name" : "Java HotSpot(TM) 64-Bit Server VM",
      |        "vm_version" : "25.72-b15",
      |        "vm_vendor" : "Oracle Corporation",
      |        "start_time_in_millis" : 1458345474505,
      |        "mem" : {
      |          "heap_init_in_bytes" : 268435456,
      |          "heap_max_in_bytes" : 1037959168,
      |          "non_heap_init_in_bytes" : 2555904,
      |          "non_heap_max_in_bytes" : 0,
      |          "direct_max_in_bytes" : 1037959168
      |        },
      |        "gc_collectors" : [ "ParNew", "ConcurrentMarkSweep" ],
      |        "memory_pools" : [ "Code Cache", "Metaspace", "Compressed Class Space", "Par Eden Space", "Par Survivor Space", "CMS Old Gen" ]
      |      }
      |    }
      |  }
      |}
    """.stripMargin
  )

}
