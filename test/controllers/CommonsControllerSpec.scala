package controllers

import elastic.Success
import models.{ElasticServer, Host}
import play.api.libs.json.Json
import play.api.test.FakeRequest
import play.api.test.Helpers._

import scala.concurrent.Future

class CommonsControllerSpec extends MockedServices {

  def is =
    s2"""
    CommonsController should                            ${step(play.api.Play.start(application))}
      return indices                                    $indices

      return index mapping                              $getIndexMapping
      validate index parameter for get mapping          $missingIndexGetIndexMapping

      return index settings                             $getIndexSettings
      validate index parameter for index settings       $missingIndexGetIndexSettings

      return node stats                                 $getNodeStats
      validate node parameter                           $missingNode

                                                        ${step(play.api.Play.stop(application))}
      """

  def indices = {
    val expectedResponse = Json.parse(
      """
        |[
        |  {"health":"green","status":"open","index":"index1","pri":"10","rep":"0","docs.count":"4330","docs.deleted":"10","store.size":"4.1mb","pri.store.size":"4.1mb"},
        |  {"health":"green","status":"closed","index":"index2","pri":"10","rep":"0","docs.count":"1497203","docs.deleted":"5048","store.size":"860.9mb","pri.store.size":"860.9mb"}
        |]
      """.stripMargin
    )
    client.getIndices(ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/commons/indices").withBody(Json.obj("host" -> "somehost"))).get
    ensure(response, 200, Json.arr("index1", "index2"))
  }

  def getIndexMapping = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "someIndex": {
        |    "mappings": {}
        |  }
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "index" -> "someIndex")
    client.getIndexMapping("someIndex", ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/commons/get_index_mapping").withBody(body)).get
    ensure(response, 200, expectedResponse)
  }

  def missingIndexGetIndexMapping = {
    val body = Json.obj("host" -> "somehost")
    val response = route(application, FakeRequest(POST, "/commons/get_index_mapping").withBody(body)).get
    ensure(response, 400, Json.obj("error" -> "Missing required parameter index"))
  }

  def getIndexSettings = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "someIndex": {
        |    "settings": {
        |      "index": {
        |        "creation_date": "1459675569309",
        |        "number_of_shards": "5",
        |        "number_of_replicas": "1",
        |        "uuid": "6sN-tL30Sfyz_tW0iVqVPQ",
        |        "version": {
        |          "created": "2030099"
        |        }
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "index" -> "someIndex")
    client.getIndexSettings("someIndex", ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/commons/get_index_settings").withBody(body)).get
    ensure(response, 200, expectedResponse)
  }

  def missingIndexGetIndexSettings = {
    val body = Json.obj("host" -> "somehost")
    val response = route(application, FakeRequest(POST, "/commons/get_index_settings").withBody(body)).get
    ensure(response, 400, Json.obj("error" -> "Missing required parameter index"))
  }

  def getNodeStats = {
    val expectedResponse = Json.parse(
      """
        |{
        |  "cluster_name": "elasticsearch",
        |  "nodes": {
        |    "MCGlWc6ERF2N9pO0uh7-tA": {
        |      "timestamp": 1459953745664,
        |      "name": "Spinnerette",
        |      "transport_address": "127.0.0.1:9300",
        |      "host": "127.0.0.1",
        |      "ip": [
        |        "127.0.0.1:9300",
        |        "NONE"
        |      ],
        |      "indices": {
        |        "docs": {
        |          "count": 2,
        |          "deleted": 0
        |        },
        |        "store": {
        |          "size_in_bytes": 6817,
        |          "throttle_time_in_millis": 0
        |        },
        |        "indexing": {
        |          "index_total": 2,
        |          "index_time_in_millis": 74,
        |          "index_current": 0,
        |          "index_failed": 0,
        |          "delete_total": 0,
        |          "delete_time_in_millis": 0,
        |          "delete_current": 0,
        |          "noop_update_total": 0,
        |          "is_throttled": false,
        |          "throttle_time_in_millis": 0
        |        },
        |        "get": {
        |          "total": 1,
        |          "time_in_millis": 1,
        |          "exists_total": 0,
        |          "exists_time_in_millis": 0,
        |          "missing_total": 1,
        |          "missing_time_in_millis": 1,
        |          "current": 0
        |        },
        |        "search": {
        |          "open_contexts": 0,
        |          "query_total": 0,
        |          "query_time_in_millis": 0,
        |          "query_current": 0,
        |          "fetch_total": 0,
        |          "fetch_time_in_millis": 0,
        |          "fetch_current": 0,
        |          "scroll_total": 0,
        |          "scroll_time_in_millis": 0,
        |          "scroll_current": 0
        |        },
        |        "merges": {
        |          "current": 0,
        |          "current_docs": 0,
        |          "current_size_in_bytes": 0,
        |          "total": 0,
        |          "total_time_in_millis": 0,
        |          "total_docs": 0,
        |          "total_size_in_bytes": 0,
        |          "total_stopped_time_in_millis": 0,
        |          "total_throttled_time_in_millis": 0,
        |          "total_auto_throttle_in_bytes": 419430400
        |        },
        |        "refresh": {
        |          "total": 17,
        |          "total_time_in_millis": 101
        |        },
        |        "flush": {
        |          "total": 15,
        |          "total_time_in_millis": 74
        |        },
        |        "warmer": {
        |          "current": 0,
        |          "total": 21,
        |          "total_time_in_millis": 0
        |        },
        |        "query_cache": {
        |          "memory_size_in_bytes": 0,
        |          "total_count": 0,
        |          "hit_count": 0,
        |          "miss_count": 0,
        |          "cache_size": 0,
        |          "cache_count": 0,
        |          "evictions": 0
        |        },
        |        "fielddata": {
        |          "memory_size_in_bytes": 0,
        |          "evictions": 0
        |        },
        |        "percolate": {
        |          "total": 0,
        |          "time_in_millis": 0,
        |          "current": 0,
        |          "memory_size_in_bytes": -1,
        |          "memory_size": "-1b",
        |          "queries": 0
        |        },
        |        "completion": {
        |          "size_in_bytes": 0
        |        },
        |        "segments": {
        |          "count": 2,
        |          "memory_in_bytes": 3474,
        |          "terms_memory_in_bytes": 2538,
        |          "stored_fields_memory_in_bytes": 624,
        |          "term_vectors_memory_in_bytes": 0,
        |          "norms_memory_in_bytes": 128,
        |          "doc_values_memory_in_bytes": 184,
        |          "index_writer_memory_in_bytes": 0,
        |          "index_writer_max_memory_in_bytes": 2560000,
        |          "version_map_memory_in_bytes": 0,
        |          "fixed_bit_set_memory_in_bytes": 0
        |        },
        |        "translog": {
        |          "operations": 0,
        |          "size_in_bytes": 215
        |        },
        |        "suggest": {
        |          "total": 0,
        |          "time_in_millis": 0,
        |          "current": 0
        |        },
        |        "request_cache": {
        |          "memory_size_in_bytes": 0,
        |          "evictions": 0,
        |          "hit_count": 0,
        |          "miss_count": 0
        |        },
        |        "recovery": {
        |          "current_as_source": 0,
        |          "current_as_target": 0,
        |          "throttle_time_in_millis": 0
        |        }
        |      },
        |      "os": {
        |        "timestamp": 1459953745665,
        |        "cpu_percent": 4,
        |        "load_average": 2.55029296875,
        |        "mem": {
        |          "total_in_bytes": 8589934592,
        |          "free_in_bytes": 88723456,
        |          "used_in_bytes": 8501211136,
        |          "free_percent": 1,
        |          "used_percent": 99
        |        },
        |        "swap": {
        |          "total_in_bytes": 2147483648,
        |          "free_in_bytes": 1364983808,
        |          "used_in_bytes": 782499840
        |        }
        |      },
        |      "process": {
        |        "timestamp": 1459953745665,
        |        "open_file_descriptors": 253,
        |        "max_file_descriptors": 10240,
        |        "cpu": {
        |          "percent": 0,
        |          "total_in_millis": 368227
        |        },
        |        "mem": {
        |          "total_virtual_in_bytes": 5300101120
        |        }
        |      },
        |      "jvm": {
        |        "timestamp": 1459953745665,
        |        "uptime_in_millis": 73007823,
        |        "mem": {
        |          "heap_used_in_bytes": 31784160,
        |          "heap_used_percent": 3,
        |          "heap_committed_in_bytes": 259522560,
        |          "heap_max_in_bytes": 1037959168,
        |          "non_heap_used_in_bytes": 63515288,
        |          "non_heap_committed_in_bytes": 64540672,
        |          "pools": {
        |            "young": {
        |              "used_in_bytes": 9182344,
        |              "max_in_bytes": 286326784,
        |              "peak_used_in_bytes": 71630848,
        |              "peak_max_in_bytes": 286326784
        |            },
        |            "survivor": {
        |              "used_in_bytes": 317880,
        |              "max_in_bytes": 35782656,
        |              "peak_used_in_bytes": 8912896,
        |              "peak_max_in_bytes": 35782656
        |            },
        |            "old": {
        |              "used_in_bytes": 22283936,
        |              "max_in_bytes": 715849728,
        |              "peak_used_in_bytes": 22283936,
        |              "peak_max_in_bytes": 715849728
        |            }
        |          }
        |        },
        |        "threads": {
        |          "count": 76,
        |          "peak_count": 94
        |        },
        |        "gc": {
        |          "collectors": {
        |            "young": {
        |              "collection_count": 15,
        |              "collection_time_in_millis": 311
        |            },
        |            "old": {
        |              "collection_count": 1,
        |              "collection_time_in_millis": 12
        |            }
        |          }
        |        },
        |        "buffer_pools": {
        |          "direct": {
        |            "count": 93,
        |            "used_in_bytes": 15269992,
        |            "total_capacity_in_bytes": 15269992
        |          },
        |          "mapped": {
        |            "count": 0,
        |            "used_in_bytes": 0,
        |            "total_capacity_in_bytes": 0
        |          }
        |        },
        |        "classes": {
        |          "current_loaded_count": 7845,
        |          "total_loaded_count": 7845,
        |          "total_unloaded_count": 0
        |        }
        |      },
        |      "thread_pool": {
        |        "bulk": {
        |          "threads": 0,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 0,
        |          "completed": 0
        |        },
        |        "fetch_shard_started": {
        |          "threads": 1,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 10,
        |          "completed": 10
        |        },
        |        "fetch_shard_store": {
        |          "threads": 0,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 0,
        |          "completed": 0
        |        },
        |        "flush": {
        |          "threads": 1,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 4,
        |          "completed": 30
        |        },
        |        "force_merge": {
        |          "threads": 0,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 0,
        |          "completed": 0
        |        },
        |        "generic": {
        |          "threads": 1,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 4,
        |          "completed": 7340
        |        },
        |        "get": {
        |          "threads": 1,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 1,
        |          "completed": 1
        |        },
        |        "index": {
        |          "threads": 2,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 2,
        |          "completed": 2
        |        },
        |        "listener": {
        |          "threads": 4,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 4,
        |          "completed": 4387
        |        },
        |        "management": {
        |          "threads": 3,
        |          "queue": 0,
        |          "active": 1,
        |          "rejected": 0,
        |          "largest": 3,
        |          "completed": 10569
        |        },
        |        "percolate": {
        |          "threads": 0,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 0,
        |          "completed": 0
        |        },
        |        "refresh": {
        |          "threads": 1,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 4,
        |          "completed": 17
        |        },
        |        "search": {
        |          "threads": 0,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 0,
        |          "completed": 0
        |        },
        |        "snapshot": {
        |          "threads": 0,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 0,
        |          "completed": 0
        |        },
        |        "suggest": {
        |          "threads": 0,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 0,
        |          "completed": 0
        |        },
        |        "warmer": {
        |          "threads": 1,
        |          "queue": 0,
        |          "active": 0,
        |          "rejected": 0,
        |          "largest": 3,
        |          "completed": 22
        |        }
        |      },
        |      "fs": {
        |        "timestamp": 1459953745665,
        |        "total": {
        |          "total_in_bytes": 249804886016,
        |          "free_in_bytes": 100962553856,
        |          "available_in_bytes": 100700409856
        |        },
        |        "data": [
        |          {
        |            "path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
        |            "mount": "/ (/dev/disk1)",
        |            "type": "hfs",
        |            "total_in_bytes": 249804886016,
        |            "free_in_bytes": 100962553856,
        |            "available_in_bytes": 100700409856
        |          }
        |        ]
        |      },
        |      "transport": {
        |        "server_open": 0,
        |        "rx_count": 6,
        |        "rx_size_in_bytes": 2520,
        |        "tx_count": 6,
        |        "tx_size_in_bytes": 2520
        |      },
        |      "http": {
        |        "current_open": 6,
        |        "total_opened": 51
        |      },
        |      "breakers": {
        |        "request": {
        |          "limit_size_in_bytes": 415183667,
        |          "limit_size": "395.9mb",
        |          "estimated_size_in_bytes": 0,
        |          "estimated_size": "0b",
        |          "overhead": 1,
        |          "tripped": 0
        |        },
        |        "fielddata": {
        |          "limit_size_in_bytes": 622775500,
        |          "limit_size": "593.9mb",
        |          "estimated_size_in_bytes": 0,
        |          "estimated_size": "0b",
        |          "overhead": 1.03,
        |          "tripped": 0
        |        },
        |        "parent": {
        |          "limit_size_in_bytes": 726571417,
        |          "limit_size": "692.9mb",
        |          "estimated_size_in_bytes": 0,
        |          "estimated_size": "0b",
        |          "overhead": 1,
        |          "tripped": 0
        |        }
        |      },
        |      "script": {
        |        "compilations": 0,
        |        "cache_evictions": 0
        |      }
        |    }
        |  }
        |}
      """.stripMargin
    )
    val body = Json.obj("host" -> "somehost", "node" -> "someNode")
    client.nodeStats("someNode", ElasticServer(Host("somehost", None))) returns Future.successful(Success(200, expectedResponse))
    val response = route(application, FakeRequest(POST, "/commons/get_node_stats").withBody(body)).get
    ensure(response, 200, expectedResponse)
  }

  def missingNode = {
    val body = Json.obj("host" -> "somehost")
    val response = route(application, FakeRequest(POST, "/commons/get_node_stats").withBody(body)).get
    ensure(response, 400, Json.obj("error" -> "Missing required parameter node"))
  }

}
