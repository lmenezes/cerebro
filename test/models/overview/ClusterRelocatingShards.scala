package models.overview

import play.api.libs.json.Json

object ClusterRelocatingShards extends ClusterStub {

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
      |            "state" : "RELOCATING",
      |            "primary" : false,
      |            "node" : "VOiMU2k5SuStH3-X1uuBGw",
      |            "relocating_node" : "xIcHb7CPRH-_m4VGCtBV-w",
      |            "shard" : 1,
      |            "index" : "hello",
      |            "version" : 18,
      |            "expected_shard_size_in_bytes" : 407699,
      |            "allocation_id" : {
      |              "id" : "rNdtAPz_RhKVBp6dpAH1cw",
      |              "relocation_id" : "avGC6WQeTzqRnQyBE9O_bQ"
      |            }
      |          }, {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 1,
      |            "index" : "hello",
      |            "version" : 18,
      |            "allocation_id" : {
      |              "id" : "hlwc94lZRvOoBoaxyEWIGg"
      |            }
      |          } ],
      |          "4" : [ {
      |            "state" : "STARTED",
      |            "primary" : false,
      |            "node" : "VOiMU2k5SuStH3-X1uuBGw",
      |            "relocating_node" : null,
      |            "shard" : 4,
      |            "index" : "hello",
      |            "version" : 12,
      |            "allocation_id" : {
      |              "id" : "A4Dfk71HTriXU1OVBFQIeA"
      |            }
      |          }, {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 4,
      |            "index" : "hello",
      |            "version" : 12,
      |            "allocation_id" : {
      |              "id" : "Kyne0gDVQEasq9VxUUsxbg"
      |            }
      |          } ],
      |          "2" : [ {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "VOiMU2k5SuStH3-X1uuBGw",
      |            "relocating_node" : null,
      |            "shard" : 2,
      |            "index" : "hello",
      |            "version" : 16,
      |            "allocation_id" : {
      |              "id" : "rN62kibSRZq0RxcwxEHKKw"
      |            }
      |          }, {
      |            "state" : "STARTED",
      |            "primary" : false,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 2,
      |            "index" : "hello",
      |            "version" : 16,
      |            "allocation_id" : {
      |              "id" : "2G3Hs3CnT5uvhpeOmHZyYg"
      |            }
      |          } ],
      |          "3" : [ {
      |            "state" : "STARTED",
      |            "primary" : false,
      |            "node" : "VOiMU2k5SuStH3-X1uuBGw",
      |            "relocating_node" : null,
      |            "shard" : 3,
      |            "index" : "hello",
      |            "version" : 12,
      |            "allocation_id" : {
      |              "id" : "NhG91IW6RCW1KAbSx67O9g"
      |            }
      |          }, {
      |            "state" : "STARTED",
      |            "primary" : true,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : null,
      |            "shard" : 3,
      |            "index" : "hello",
      |            "version" : 12,
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
      |            "version" : 19,
      |            "allocation_id" : {
      |              "id" : "13mrI6FhRjGEk7xG7xYJvg"
      |            }
      |          }, {
      |            "state" : "RELOCATING",
      |            "primary" : false,
      |            "node" : "cPsT9o5FQ3WRnvqSTXHiVQ",
      |            "relocating_node" : "xIcHb7CPRH-_m4VGCtBV-w",
      |            "shard" : 0,
      |            "index" : "hello",
      |            "version" : 19,
      |            "expected_shard_size_in_bytes" : 405582,
      |            "allocation_id" : {
      |              "id" : "FbfzrPiySEaOzGMRZRDf7w",
      |              "relocation_id" : "fU5MEf2SSyGi40BscFJQsw"
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
      |      "timestamp" : 1458467882703,
      |      "name" : "Random",
      |      "transport_address" : "127.0.0.1:9301",
      |      "host" : "127.0.0.1",
      |      "ip" : [ "127.0.0.1:9301", "NONE" ],
      |      "os" : {
      |        "timestamp" : 1458467882703,
      |        "load_average" : 3.46435546875,
      |        "mem" : {
      |          "total_in_bytes" : 8589934592,
      |          "free_in_bytes" : 160845824,
      |          "used_in_bytes" : 8429088768,
      |          "free_percent" : 2,
      |          "used_percent" : 98
      |        },
      |        "swap" : {
      |          "total_in_bytes" : 3221225472,
      |          "free_in_bytes" : 1782317056,
      |          "used_in_bytes" : 1438908416
      |        }
      |      },
      |      "process" : {
      |        "timestamp" : 1458467882703,
      |        "open_file_descriptors" : 341,
      |        "max_file_descriptors" : 10240,
      |        "cpu" : {
      |          "percent" : 0,
      |          "total_in_millis" : 221649
      |        },
      |        "mem" : {
      |          "total_virtual_in_bytes" : 5311496192
      |        }
      |      },
      |      "jvm" : {
      |        "timestamp" : 1458467882703,
      |        "uptime_in_millis" : 2812465,
      |        "mem" : {
      |          "heap_used_in_bytes" : 109357464,
      |          "heap_used_percent" : 10,
      |          "heap_committed_in_bytes" : 259522560,
      |          "heap_max_in_bytes" : 1037959168,
      |          "non_heap_used_in_bytes" : 70464888,
      |          "non_heap_committed_in_bytes" : 71409664,
      |          "pools" : {
      |            "young" : {
      |              "used_in_bytes" : 60805240,
      |              "max_in_bytes" : 286326784,
      |              "peak_used_in_bytes" : 71630848,
      |              "peak_max_in_bytes" : 286326784
      |            },
      |            "survivor" : {
      |              "used_in_bytes" : 2424584,
      |              "max_in_bytes" : 35782656,
      |              "peak_used_in_bytes" : 8912896,
      |              "peak_max_in_bytes" : 35782656
      |            },
      |            "old" : {
      |              "used_in_bytes" : 46127640,
      |              "max_in_bytes" : 715849728,
      |              "peak_used_in_bytes" : 46127640,
      |              "peak_max_in_bytes" : 715849728
      |            }
      |          }
      |        },
      |        "threads" : {
      |          "count" : 81,
      |          "peak_count" : 103
      |        },
      |        "gc" : {
      |          "collectors" : {
      |            "young" : {
      |              "collection_count" : 174,
      |              "collection_time_in_millis" : 866
      |            },
      |            "old" : {
      |              "collection_count" : 1,
      |              "collection_time_in_millis" : 16
      |            }
      |          }
      |        },
      |        "buffer_pools" : {
      |          "direct" : {
      |            "count" : 125,
      |            "used_in_bytes" : 20117010,
      |            "total_capacity_in_bytes" : 20117010
      |          },
      |          "mapped" : {
      |            "count" : 16,
      |            "used_in_bytes" : 1065237,
      |            "total_capacity_in_bytes" : 1065237
      |          }
      |        }
      |      },
      |      "fs" : {
      |        "timestamp" : 1458467882703,
      |        "total" : {
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 40472023040,
      |          "available_in_bytes" : 40209879040
      |        },
      |        "data" : [ {
      |          "path" : "/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/1",
      |          "mount" : "/ (/dev/disk1)",
      |          "type" : "hfs",
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 40472023040,
      |          "available_in_bytes" : 40209879040
      |        } ]
      |      }
      |    },
      |    "xIcHb7CPRH-_m4VGCtBV-w" : {
      |      "timestamp" : 1458467882703,
      |      "name" : "Force",
      |      "transport_address" : "127.0.0.1:9302",
      |      "host" : "127.0.0.1",
      |      "ip" : [ "127.0.0.1:9302", "NONE" ],
      |      "os" : {
      |        "timestamp" : 1458467882703,
      |        "load_average" : 3.46435546875,
      |        "mem" : {
      |          "total_in_bytes" : 8589934592,
      |          "free_in_bytes" : 160845824,
      |          "used_in_bytes" : 8429088768,
      |          "free_percent" : 2,
      |          "used_percent" : 98
      |        },
      |        "swap" : {
      |          "total_in_bytes" : 3221225472,
      |          "free_in_bytes" : 1782317056,
      |          "used_in_bytes" : 1438908416
      |        }
      |      },
      |      "process" : {
      |        "timestamp" : 1458467882703,
      |        "open_file_descriptors" : 287,
      |        "max_file_descriptors" : 10240,
      |        "cpu" : {
      |          "percent" : 0,
      |          "total_in_millis" : 9698
      |        },
      |        "mem" : {
      |          "total_virtual_in_bytes" : 5304852480
      |        }
      |      },
      |      "jvm" : {
      |        "timestamp" : 1458467882703,
      |        "uptime_in_millis" : 20926,
      |        "mem" : {
      |          "heap_used_in_bytes" : 61247544,
      |          "heap_used_percent" : 5,
      |          "heap_committed_in_bytes" : 259522560,
      |          "heap_max_in_bytes" : 1037959168,
      |          "non_heap_used_in_bytes" : 45875264,
      |          "non_heap_committed_in_bytes" : 46505984,
      |          "pools" : {
      |            "young" : {
      |              "used_in_bytes" : 42389104,
      |              "max_in_bytes" : 286326784,
      |              "peak_used_in_bytes" : 71630848,
      |              "peak_max_in_bytes" : 286326784
      |            },
      |            "survivor" : {
      |              "used_in_bytes" : 7531480,
      |              "max_in_bytes" : 35782656,
      |              "peak_used_in_bytes" : 8912888,
      |              "peak_max_in_bytes" : 35782656
      |            },
      |            "old" : {
      |              "used_in_bytes" : 11326960,
      |              "max_in_bytes" : 715849728,
      |              "peak_used_in_bytes" : 11326960,
      |              "peak_max_in_bytes" : 715849728
      |            }
      |          }
      |        },
      |        "threads" : {
      |          "count" : 78,
      |          "peak_count" : 78
      |        },
      |        "gc" : {
      |          "collectors" : {
      |            "young" : {
      |              "collection_count" : 4,
      |              "collection_time_in_millis" : 52
      |            },
      |            "old" : {
      |              "collection_count" : 1,
      |              "collection_time_in_millis" : 16
      |            }
      |          }
      |        },
      |        "buffer_pools" : {
      |          "direct" : {
      |            "count" : 79,
      |            "used_in_bytes" : 16786963,
      |            "total_capacity_in_bytes" : 16786963
      |          },
      |          "mapped" : {
      |            "count" : 0,
      |            "used_in_bytes" : 0,
      |            "total_capacity_in_bytes" : 0
      |          }
      |        }
      |      },
      |      "fs" : {
      |        "timestamp" : 1458467882704,
      |        "total" : {
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 40471994368,
      |          "available_in_bytes" : 40209850368
      |        },
      |        "data" : [ {
      |          "path" : "/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/2",
      |          "mount" : "/ (/dev/disk1)",
      |          "type" : "hfs",
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 40471994368,
      |          "available_in_bytes" : 40209850368
      |        } ]
      |      }
      |    },
      |    "cPsT9o5FQ3WRnvqSTXHiVQ" : {
      |      "timestamp" : 1458467882703,
      |      "name" : "Cecilia Reyes",
      |      "transport_address" : "127.0.0.1:9300",
      |      "host" : "127.0.0.1",
      |      "ip" : [ "127.0.0.1:9300", "NONE" ],
      |      "os" : {
      |        "timestamp" : 1458467882703,
      |        "load_average" : 3.46435546875,
      |        "mem" : {
      |          "total_in_bytes" : 8589934592,
      |          "free_in_bytes" : 160845824,
      |          "used_in_bytes" : 8429088768,
      |          "free_percent" : 2,
      |          "used_percent" : 98
      |        },
      |        "swap" : {
      |          "total_in_bytes" : 3221225472,
      |          "free_in_bytes" : 1782317056,
      |          "used_in_bytes" : 1438908416
      |        }
      |      },
      |      "process" : {
      |        "timestamp" : 1458467882703,
      |        "open_file_descriptors" : 356,
      |        "max_file_descriptors" : 10240,
      |        "cpu" : {
      |          "percent" : 0,
      |          "total_in_millis" : 461242
      |        },
      |        "mem" : {
      |          "total_virtual_in_bytes" : 5319544832
      |        }
      |      },
      |      "jvm" : {
      |        "timestamp" : 1458467882703,
      |        "uptime_in_millis" : 14057100,
      |        "mem" : {
      |          "heap_used_in_bytes" : 80014736,
      |          "heap_used_percent" : 7,
      |          "heap_committed_in_bytes" : 259522560,
      |          "heap_max_in_bytes" : 1037959168,
      |          "non_heap_used_in_bytes" : 81637648,
      |          "non_heap_committed_in_bytes" : 83148800,
      |          "pools" : {
      |            "young" : {
      |              "used_in_bytes" : 61420544,
      |              "max_in_bytes" : 286326784,
      |              "peak_used_in_bytes" : 71630848,
      |              "peak_max_in_bytes" : 286326784
      |            },
      |            "survivor" : {
      |              "used_in_bytes" : 1478648,
      |              "max_in_bytes" : 35782656,
      |              "peak_used_in_bytes" : 8912896,
      |              "peak_max_in_bytes" : 35782656
      |            },
      |            "old" : {
      |              "used_in_bytes" : 17115544,
      |              "max_in_bytes" : 715849728,
      |              "peak_used_in_bytes" : 104965192,
      |              "peak_max_in_bytes" : 715849728
      |            }
      |          }
      |        },
      |        "threads" : {
      |          "count" : 85,
      |          "peak_count" : 106
      |        },
      |        "gc" : {
      |          "collectors" : {
      |            "young" : {
      |              "collection_count" : 254,
      |              "collection_time_in_millis" : 1635
      |            },
      |            "old" : {
      |              "collection_count" : 2,
      |              "collection_time_in_millis" : 134
      |            }
      |          }
      |        },
      |        "buffer_pools" : {
      |          "direct" : {
      |            "count" : 173,
      |            "used_in_bytes" : 28642823,
      |            "total_capacity_in_bytes" : 28642823
      |          },
      |          "mapped" : {
      |            "count" : 15,
      |            "used_in_bytes" : 891872,
      |            "total_capacity_in_bytes" : 891872
      |          }
      |        },
      |        "classes" : {
      |          "current_loaded_count" : 7609,
      |          "total_loaded_count" : 7623,
      |          "total_unloaded_count" : 14
      |        }
      |      },
      |      "fs" : {
      |        "timestamp" : 1458467882703,
      |        "total" : {
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 40472023040,
      |          "available_in_bytes" : 40209879040
      |        },
      |        "data" : [ {
      |          "path" : "/Users/leonardo.menezes/Downloads/elasticsearch-2.1.0/data/elasticsearch/nodes/0",
      |          "mount" : "/ (/dev/disk1)",
      |          "type" : "hfs",
      |          "total_in_bytes" : 249804886016,
      |          "free_in_bytes" : 40472023040,
      |          "available_in_bytes" : 40209879040
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
      |    "successful" : 10,
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
      |        "count" : 217360,
      |        "deleted" : 0
      |      },
      |      "store" : {
      |        "size_in_bytes" : 4052542,
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
      |          "count" : 217360,
      |          "deleted" : 0
      |        },
      |        "store" : {
      |          "size_in_bytes" : 4052542,
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
      |  "status" : "green",
      |  "timed_out" : false,
      |  "number_of_nodes" : 3,
      |  "number_of_data_nodes" : 3,
      |  "active_primary_shards" : 5,
      |  "active_shards" : 10,
      |  "relocating_shards" : 2,
      |  "initializing_shards" : 0,
      |  "unassigned_shards" : 0,
      |  "delayed_unassigned_shards" : 0,
      |  "number_of_pending_tasks" : 0,
      |  "number_of_in_flight_fetch" : 0,
      |  "task_max_waiting_in_queue_millis" : 0,
      |  "active_shards_percent_as_number" : 100
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
      |    "xIcHb7CPRH-_m4VGCtBV-w" : {
      |      "name" : "Force",
      |      "transport_address" : "127.0.0.1:9302",
      |      "host" : "127.0.0.1",
      |      "ip" : "127.0.0.1",
      |      "version" : "2.1.0",
      |      "build" : "72cd1f1",
      |      "http_address" : "127.0.0.1:9202",
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
      |        "pid" : 76352,
      |        "version" : "1.8.0_72",
      |        "vm_name" : "Java HotSpot(TM) 64-Bit Server VM",
      |        "vm_version" : "25.72-b15",
      |        "vm_vendor" : "Oracle Corporation",
      |        "start_time_in_millis" : 1458467861836,
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

  val main = Json.parse(
    """
      |{
      |  "name" : "Cecilia Reyes",
      |  "cluster_name" : "elasticsearch",
      |  "version" : {
      |    "number" : "2.1.0",
      |    "build_hash" : "72cd1f1a3eee09505e036106146dc1949dc5dc87",
      |    "build_timestamp" : "2015-11-18T22:40:03Z",
      |    "build_snapshot" : false,
      |    "lucene_version" : "5.3.1"
      |  },
      |  "tagline" : "You Know, for Search"
      |}
    """.stripMargin
  )

}
