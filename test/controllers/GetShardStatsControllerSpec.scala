package controllers

import elastic.{ElasticClient, ElasticResponse}
import exceptions.MissingRequiredParamException
import models.CerebroRequest
import org.specs2.Specification
import org.specs2.mock.Mockito
import play.api.libs.json.Json
import play.api.test.FakeApplication
import play.api.test.Helpers._

import scala.concurrent.Future

object GetShardStatsControllerSpec extends Specification with Mockito {

  def is =
    s2"""
    GetShardStatsControllerSpec should             ${step(play.api.Play.start(FakeApplication()))}
      invoke getShardStats and getIndexRecovery    $getShardStats
      throw exception if index param is missing    $missingIndex
      throw exception if shard param is missing    $missingShard
      throw exception if node param is missing     $missingNode
      """

  val controller = new GetShardStatsController

  def getShardStats = {
    val body = Json.obj("host" -> "somehost", "index" -> "someIndex", "node" -> "MCGlWc6ERF2N9pO0uh7-tA", "shard" -> 1)
    val client = mock[ElasticClient]
    client.getShardStats("someIndex", "somehost") returns Future.successful(ElasticResponse(200, expectedStats))
    client.getIndexRecovery("someIndex", "somehost") returns Future.successful(ElasticResponse(200, expectedRecovery))
    val result = controller.processRequest(CerebroRequest(body), client)
    there was one(client).getShardStats("someIndex", "somehost")
    there was one(client).getIndexRecovery("someIndex", "somehost")
    contentAsJson(result) mustEqual expectedShardStats
    status(result) mustEqual 200
  }

  def missingIndex = {
    val body = Json.obj("host" -> "somehost", "node" -> "someNode", "shard" -> 1)
    val client = mock[ElasticClient]
    controller.processRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

  def missingNode = {
    val body = Json.obj("host" -> "somehost", "index" -> "someIndex", "shard" -> 1)
    val client = mock[ElasticClient]
    controller.processRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

  def missingShard = {
    val body = Json.obj("host" -> "somehost", "node" -> "someNode", "index" -> "someIndex")
    val client = mock[ElasticClient]
    controller.processRequest(CerebroRequest(body), client) must throwA[MissingRequiredParamException]
  }

  val expectedShardStats = Json.parse(
    """
      |{
      |  "routing": {
      |    "state": "STARTED",
      |    "primary": true,
      |    "node": "MCGlWc6ERF2N9pO0uh7-tA",
      |    "relocating_node": null
      |  },
      |  "docs": {
      |    "count": 0,
      |    "deleted": 0
      |  },
      |  "store": {
      |    "size": "130b",
      |    "size_in_bytes": 130,
      |    "throttle_time": "0s",
      |    "throttle_time_in_millis": 0
      |  },
      |  "indexing": {
      |    "index_total": 0,
      |    "index_time": "0s",
      |    "index_time_in_millis": 0,
      |    "index_current": 0,
      |    "index_failed": 0,
      |    "delete_total": 0,
      |    "delete_time": "0s",
      |    "delete_time_in_millis": 0,
      |    "delete_current": 0,
      |    "noop_update_total": 0,
      |    "is_throttled": false,
      |    "throttle_time": "0s",
      |    "throttle_time_in_millis": 0
      |  },
      |  "get": {
      |    "total": 0,
      |    "get_time": "0s",
      |    "time_in_millis": 0,
      |    "exists_total": 0,
      |    "exists_time": "0s",
      |    "exists_time_in_millis": 0,
      |    "missing_total": 0,
      |    "missing_time": "0s",
      |    "missing_time_in_millis": 0,
      |    "current": 0
      |  },
      |  "search": {
      |    "open_contexts": 0,
      |    "query_total": 0,
      |    "query_time": "0s",
      |    "query_time_in_millis": 0,
      |    "query_current": 0,
      |    "fetch_total": 0,
      |    "fetch_time": "0s",
      |    "fetch_time_in_millis": 0,
      |    "fetch_current": 0,
      |    "scroll_total": 0,
      |    "scroll_time": "0s",
      |    "scroll_time_in_millis": 0,
      |    "scroll_current": 0
      |  },
      |  "merges": {
      |    "current": 0,
      |    "current_docs": 0,
      |    "current_size": "0b",
      |    "current_size_in_bytes": 0,
      |    "total": 0,
      |    "total_time": "0s",
      |    "total_time_in_millis": 0,
      |    "total_docs": 0,
      |    "total_size": "0b",
      |    "total_size_in_bytes": 0,
      |    "total_stopped_time": "0s",
      |    "total_stopped_time_in_millis": 0,
      |    "total_throttled_time": "0s",
      |    "total_throttled_time_in_millis": 0,
      |    "total_auto_throttle": "20mb",
      |    "total_auto_throttle_in_bytes": 20971520
      |  },
      |  "refresh": {
      |    "total": 0,
      |    "total_time": "0s",
      |    "total_time_in_millis": 0
      |  },
      |  "flush": {
      |    "total": 0,
      |    "total_time": "0s",
      |    "total_time_in_millis": 0
      |  },
      |  "warmer": {
      |    "current": 0,
      |    "total": 2,
      |    "total_time": "0s",
      |    "total_time_in_millis": 0
      |  },
      |  "query_cache": {
      |    "memory_size": "0b",
      |    "memory_size_in_bytes": 0,
      |    "total_count": 0,
      |    "hit_count": 0,
      |    "miss_count": 0,
      |    "cache_size": 0,
      |    "cache_count": 0,
      |    "evictions": 0
      |  },
      |  "fielddata": {
      |    "memory_size": "0b",
      |    "memory_size_in_bytes": 0,
      |    "evictions": 0
      |  },
      |  "percolate": {
      |    "total": 0,
      |    "time": "0s",
      |    "time_in_millis": 0,
      |    "current": 0,
      |    "memory_size_in_bytes": -1,
      |    "memory_size": "-1b",
      |    "queries": 0
      |  },
      |  "completion": {
      |    "size": "0b",
      |    "size_in_bytes": 0
      |  },
      |  "segments": {
      |    "count": 0,
      |    "memory": "0b",
      |    "memory_in_bytes": 0,
      |    "terms_memory": "0b",
      |    "terms_memory_in_bytes": 0,
      |    "stored_fields_memory": "0b",
      |    "stored_fields_memory_in_bytes": 0,
      |    "term_vectors_memory": "0b",
      |    "term_vectors_memory_in_bytes": 0,
      |    "norms_memory": "0b",
      |    "norms_memory_in_bytes": 0,
      |    "doc_values_memory": "0b",
      |    "doc_values_memory_in_bytes": 0,
      |    "index_writer_memory": "0b",
      |    "index_writer_memory_in_bytes": 0,
      |    "index_writer_max_memory": "19.7mb",
      |    "index_writer_max_memory_in_bytes": 20759183,
      |    "version_map_memory": "0b",
      |    "version_map_memory_in_bytes": 0,
      |    "fixed_bit_set": "0b",
      |    "fixed_bit_set_memory_in_bytes": 0
      |  },
      |  "translog": {
      |    "operations": 0,
      |    "size": "43b",
      |    "size_in_bytes": 43
      |  },
      |  "suggest": {
      |    "total": 0,
      |    "time": "0s",
      |    "time_in_millis": 0,
      |    "current": 0
      |  },
      |  "request_cache": {
      |    "memory_size": "0b",
      |    "memory_size_in_bytes": 0,
      |    "evictions": 0,
      |    "hit_count": 0,
      |    "miss_count": 0
      |  },
      |  "recovery": {
      |    "current_as_source": 0,
      |    "current_as_target": 0,
      |    "throttle_time": "0s",
      |    "throttle_time_in_millis": 0
      |  },
      |  "commit": {
      |    "id": "0KEgzr3H8IYfFwjGYMMyuA==",
      |    "generation": 1,
      |    "user_data": {
      |      "translog_generation": "1",
      |      "translog_uuid": "82KA20bLQNOpsghTmrdnyA"
      |    },
      |    "num_docs": 0
      |  },
      |  "shard_path": {
      |    "state_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |    "data_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |    "is_custom_data_path": false
      |  }
      |}
    """.stripMargin
  )

  val expectedStats = Json.parse(
    """
      |{
      |  "_shards": {
      |    "total": 10,
      |    "successful": 5,
      |    "failed": 0
      |  },
      |  "indices": {
      |    "someIndex": {
      |      "shards": {
      |        "0": [
      |          {
      |            "routing": {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "MCGlWc6ERF2N9pO0uh7-tA",
      |              "relocating_node": null
      |            },
      |            "docs": {
      |              "count": 0,
      |              "deleted": 0
      |            },
      |            "store": {
      |              "size": "130b",
      |              "size_in_bytes": 130,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "indexing": {
      |              "index_total": 0,
      |              "index_time": "0s",
      |              "index_time_in_millis": 0,
      |              "index_current": 0,
      |              "index_failed": 0,
      |              "delete_total": 0,
      |              "delete_time": "0s",
      |              "delete_time_in_millis": 0,
      |              "delete_current": 0,
      |              "noop_update_total": 0,
      |              "is_throttled": false,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "get": {
      |              "total": 0,
      |              "get_time": "0s",
      |              "time_in_millis": 0,
      |              "exists_total": 0,
      |              "exists_time": "0s",
      |              "exists_time_in_millis": 0,
      |              "missing_total": 0,
      |              "missing_time": "0s",
      |              "missing_time_in_millis": 0,
      |              "current": 0
      |            },
      |            "search": {
      |              "open_contexts": 0,
      |              "query_total": 0,
      |              "query_time": "0s",
      |              "query_time_in_millis": 0,
      |              "query_current": 0,
      |              "fetch_total": 0,
      |              "fetch_time": "0s",
      |              "fetch_time_in_millis": 0,
      |              "fetch_current": 0,
      |              "scroll_total": 0,
      |              "scroll_time": "0s",
      |              "scroll_time_in_millis": 0,
      |              "scroll_current": 0
      |            },
      |            "merges": {
      |              "current": 0,
      |              "current_docs": 0,
      |              "current_size": "0b",
      |              "current_size_in_bytes": 0,
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0,
      |              "total_docs": 0,
      |              "total_size": "0b",
      |              "total_size_in_bytes": 0,
      |              "total_stopped_time": "0s",
      |              "total_stopped_time_in_millis": 0,
      |              "total_throttled_time": "0s",
      |              "total_throttled_time_in_millis": 0,
      |              "total_auto_throttle": "20mb",
      |              "total_auto_throttle_in_bytes": 20971520
      |            },
      |            "refresh": {
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "flush": {
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "warmer": {
      |              "current": 0,
      |              "total": 2,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "query_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "total_count": 0,
      |              "hit_count": 0,
      |              "miss_count": 0,
      |              "cache_size": 0,
      |              "cache_count": 0,
      |              "evictions": 0
      |            },
      |            "fielddata": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0
      |            },
      |            "percolate": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0,
      |              "memory_size_in_bytes": -1,
      |              "memory_size": "-1b",
      |              "queries": 0
      |            },
      |            "completion": {
      |              "size": "0b",
      |              "size_in_bytes": 0
      |            },
      |            "segments": {
      |              "count": 0,
      |              "memory": "0b",
      |              "memory_in_bytes": 0,
      |              "terms_memory": "0b",
      |              "terms_memory_in_bytes": 0,
      |              "stored_fields_memory": "0b",
      |              "stored_fields_memory_in_bytes": 0,
      |              "term_vectors_memory": "0b",
      |              "term_vectors_memory_in_bytes": 0,
      |              "norms_memory": "0b",
      |              "norms_memory_in_bytes": 0,
      |              "doc_values_memory": "0b",
      |              "doc_values_memory_in_bytes": 0,
      |              "index_writer_memory": "0b",
      |              "index_writer_memory_in_bytes": 0,
      |              "index_writer_max_memory": "19.7mb",
      |              "index_writer_max_memory_in_bytes": 20759183,
      |              "version_map_memory": "0b",
      |              "version_map_memory_in_bytes": 0,
      |              "fixed_bit_set": "0b",
      |              "fixed_bit_set_memory_in_bytes": 0
      |            },
      |            "translog": {
      |              "operations": 0,
      |              "size": "43b",
      |              "size_in_bytes": 43
      |            },
      |            "suggest": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0
      |            },
      |            "request_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0,
      |              "hit_count": 0,
      |              "miss_count": 0
      |            },
      |            "recovery": {
      |              "current_as_source": 0,
      |              "current_as_target": 0,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "commit": {
      |              "id": "0KEgzr3H8IYfFwjGYMMyug==",
      |              "generation": 1,
      |              "user_data": {
      |                "translog_generation": "1",
      |                "translog_uuid": "TErnWxXURCG5bgwnpY7Msw"
      |              },
      |              "num_docs": 0
      |            },
      |            "shard_path": {
      |              "state_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "data_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "is_custom_data_path": false
      |            }
      |          }
      |        ],
      |        "1": [
      |          {
      |            "routing": {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "MCGlWc6ERF2N9pO0uh7-tA",
      |              "relocating_node": null
      |            },
      |            "docs": {
      |              "count": 0,
      |              "deleted": 0
      |            },
      |            "store": {
      |              "size": "130b",
      |              "size_in_bytes": 130,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "indexing": {
      |              "index_total": 0,
      |              "index_time": "0s",
      |              "index_time_in_millis": 0,
      |              "index_current": 0,
      |              "index_failed": 0,
      |              "delete_total": 0,
      |              "delete_time": "0s",
      |              "delete_time_in_millis": 0,
      |              "delete_current": 0,
      |              "noop_update_total": 0,
      |              "is_throttled": false,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "get": {
      |              "total": 0,
      |              "get_time": "0s",
      |              "time_in_millis": 0,
      |              "exists_total": 0,
      |              "exists_time": "0s",
      |              "exists_time_in_millis": 0,
      |              "missing_total": 0,
      |              "missing_time": "0s",
      |              "missing_time_in_millis": 0,
      |              "current": 0
      |            },
      |            "search": {
      |              "open_contexts": 0,
      |              "query_total": 0,
      |              "query_time": "0s",
      |              "query_time_in_millis": 0,
      |              "query_current": 0,
      |              "fetch_total": 0,
      |              "fetch_time": "0s",
      |              "fetch_time_in_millis": 0,
      |              "fetch_current": 0,
      |              "scroll_total": 0,
      |              "scroll_time": "0s",
      |              "scroll_time_in_millis": 0,
      |              "scroll_current": 0
      |            },
      |            "merges": {
      |              "current": 0,
      |              "current_docs": 0,
      |              "current_size": "0b",
      |              "current_size_in_bytes": 0,
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0,
      |              "total_docs": 0,
      |              "total_size": "0b",
      |              "total_size_in_bytes": 0,
      |              "total_stopped_time": "0s",
      |              "total_stopped_time_in_millis": 0,
      |              "total_throttled_time": "0s",
      |              "total_throttled_time_in_millis": 0,
      |              "total_auto_throttle": "20mb",
      |              "total_auto_throttle_in_bytes": 20971520
      |            },
      |            "refresh": {
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "flush": {
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "warmer": {
      |              "current": 0,
      |              "total": 2,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "query_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "total_count": 0,
      |              "hit_count": 0,
      |              "miss_count": 0,
      |              "cache_size": 0,
      |              "cache_count": 0,
      |              "evictions": 0
      |            },
      |            "fielddata": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0
      |            },
      |            "percolate": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0,
      |              "memory_size_in_bytes": -1,
      |              "memory_size": "-1b",
      |              "queries": 0
      |            },
      |            "completion": {
      |              "size": "0b",
      |              "size_in_bytes": 0
      |            },
      |            "segments": {
      |              "count": 0,
      |              "memory": "0b",
      |              "memory_in_bytes": 0,
      |              "terms_memory": "0b",
      |              "terms_memory_in_bytes": 0,
      |              "stored_fields_memory": "0b",
      |              "stored_fields_memory_in_bytes": 0,
      |              "term_vectors_memory": "0b",
      |              "term_vectors_memory_in_bytes": 0,
      |              "norms_memory": "0b",
      |              "norms_memory_in_bytes": 0,
      |              "doc_values_memory": "0b",
      |              "doc_values_memory_in_bytes": 0,
      |              "index_writer_memory": "0b",
      |              "index_writer_memory_in_bytes": 0,
      |              "index_writer_max_memory": "19.7mb",
      |              "index_writer_max_memory_in_bytes": 20759183,
      |              "version_map_memory": "0b",
      |              "version_map_memory_in_bytes": 0,
      |              "fixed_bit_set": "0b",
      |              "fixed_bit_set_memory_in_bytes": 0
      |            },
      |            "translog": {
      |              "operations": 0,
      |              "size": "43b",
      |              "size_in_bytes": 43
      |            },
      |            "suggest": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0
      |            },
      |            "request_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0,
      |              "hit_count": 0,
      |              "miss_count": 0
      |            },
      |            "recovery": {
      |              "current_as_source": 0,
      |              "current_as_target": 0,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "commit": {
      |              "id": "0KEgzr3H8IYfFwjGYMMyuA==",
      |              "generation": 1,
      |              "user_data": {
      |                "translog_generation": "1",
      |                "translog_uuid": "82KA20bLQNOpsghTmrdnyA"
      |              },
      |              "num_docs": 0
      |            },
      |            "shard_path": {
      |              "state_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "data_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "is_custom_data_path": false
      |            }
      |          }
      |        ],
      |        "2": [
      |          {
      |            "routing": {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "MCGlWc6ERF2N9pO0uh7-tA",
      |              "relocating_node": null
      |            },
      |            "docs": {
      |              "count": 1,
      |              "deleted": 0
      |            },
      |            "store": {
      |              "size": "3kb",
      |              "size_in_bytes": 3076,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "indexing": {
      |              "index_total": 1,
      |              "index_time": "4ms",
      |              "index_time_in_millis": 4,
      |              "index_current": 0,
      |              "index_failed": 0,
      |              "delete_total": 0,
      |              "delete_time": "0s",
      |              "delete_time_in_millis": 0,
      |              "delete_current": 0,
      |              "noop_update_total": 0,
      |              "is_throttled": false,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "get": {
      |              "total": 0,
      |              "get_time": "0s",
      |              "time_in_millis": 0,
      |              "exists_total": 0,
      |              "exists_time": "0s",
      |              "exists_time_in_millis": 0,
      |              "missing_total": 0,
      |              "missing_time": "0s",
      |              "missing_time_in_millis": 0,
      |              "current": 0
      |            },
      |            "search": {
      |              "open_contexts": 0,
      |              "query_total": 0,
      |              "query_time": "0s",
      |              "query_time_in_millis": 0,
      |              "query_current": 0,
      |              "fetch_total": 0,
      |              "fetch_time": "0s",
      |              "fetch_time_in_millis": 0,
      |              "fetch_current": 0,
      |              "scroll_total": 0,
      |              "scroll_time": "0s",
      |              "scroll_time_in_millis": 0,
      |              "scroll_current": 0
      |            },
      |            "merges": {
      |              "current": 0,
      |              "current_docs": 0,
      |              "current_size": "0b",
      |              "current_size_in_bytes": 0,
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0,
      |              "total_docs": 0,
      |              "total_size": "0b",
      |              "total_size_in_bytes": 0,
      |              "total_stopped_time": "0s",
      |              "total_stopped_time_in_millis": 0,
      |              "total_throttled_time": "0s",
      |              "total_throttled_time_in_millis": 0,
      |              "total_auto_throttle": "20mb",
      |              "total_auto_throttle_in_bytes": 20971520
      |            },
      |            "refresh": {
      |              "total": 1,
      |              "total_time": "19ms",
      |              "total_time_in_millis": 19
      |            },
      |            "flush": {
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "warmer": {
      |              "current": 0,
      |              "total": 4,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "query_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "total_count": 0,
      |              "hit_count": 0,
      |              "miss_count": 0,
      |              "cache_size": 0,
      |              "cache_count": 0,
      |              "evictions": 0
      |            },
      |            "fielddata": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0
      |            },
      |            "percolate": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0,
      |              "memory_size_in_bytes": -1,
      |              "memory_size": "-1b",
      |              "queries": 0
      |            },
      |            "completion": {
      |              "size": "0b",
      |              "size_in_bytes": 0
      |            },
      |            "segments": {
      |              "count": 1,
      |              "memory": "1.6kb",
      |              "memory_in_bytes": 1737,
      |              "terms_memory": "1.2kb",
      |              "terms_memory_in_bytes": 1269,
      |              "stored_fields_memory": "312b",
      |              "stored_fields_memory_in_bytes": 312,
      |              "term_vectors_memory": "0b",
      |              "term_vectors_memory_in_bytes": 0,
      |              "norms_memory": "64b",
      |              "norms_memory_in_bytes": 64,
      |              "doc_values_memory": "92b",
      |              "doc_values_memory_in_bytes": 92,
      |              "index_writer_memory": "0b",
      |              "index_writer_memory_in_bytes": 0,
      |              "index_writer_max_memory": "19.7mb",
      |              "index_writer_max_memory_in_bytes": 20759183,
      |              "version_map_memory": "0b",
      |              "version_map_memory_in_bytes": 0,
      |              "fixed_bit_set": "0b",
      |              "fixed_bit_set_memory_in_bytes": 0
      |            },
      |            "translog": {
      |              "operations": 1,
      |              "size": "100b",
      |              "size_in_bytes": 100
      |            },
      |            "suggest": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0
      |            },
      |            "request_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0,
      |              "hit_count": 0,
      |              "miss_count": 0
      |            },
      |            "recovery": {
      |              "current_as_source": 0,
      |              "current_as_target": 0,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "commit": {
      |              "id": "0KEgzr3H8IYfFwjGYMMytw==",
      |              "generation": 1,
      |              "user_data": {
      |                "translog_generation": "1",
      |                "translog_uuid": "ANcmWOkGQ165AT0H7mz3JQ"
      |              },
      |              "num_docs": 0
      |            },
      |            "shard_path": {
      |              "state_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "data_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "is_custom_data_path": false
      |            }
      |          }
      |        ],
      |        "3": [
      |          {
      |            "routing": {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "MCGlWc6ERF2N9pO0uh7-tA",
      |              "relocating_node": null
      |            },
      |            "docs": {
      |              "count": 1,
      |              "deleted": 0
      |            },
      |            "store": {
      |              "size": "3kb",
      |              "size_in_bytes": 3076,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "indexing": {
      |              "index_total": 1,
      |              "index_time": "70ms",
      |              "index_time_in_millis": 70,
      |              "index_current": 0,
      |              "index_failed": 0,
      |              "delete_total": 0,
      |              "delete_time": "0s",
      |              "delete_time_in_millis": 0,
      |              "delete_current": 0,
      |              "noop_update_total": 0,
      |              "is_throttled": false,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "get": {
      |              "total": 0,
      |              "get_time": "0s",
      |              "time_in_millis": 0,
      |              "exists_total": 0,
      |              "exists_time": "0s",
      |              "exists_time_in_millis": 0,
      |              "missing_total": 0,
      |              "missing_time": "0s",
      |              "missing_time_in_millis": 0,
      |              "current": 0
      |            },
      |            "search": {
      |              "open_contexts": 0,
      |              "query_total": 0,
      |              "query_time": "0s",
      |              "query_time_in_millis": 0,
      |              "query_current": 0,
      |              "fetch_total": 0,
      |              "fetch_time": "0s",
      |              "fetch_time_in_millis": 0,
      |              "fetch_current": 0,
      |              "scroll_total": 0,
      |              "scroll_time": "0s",
      |              "scroll_time_in_millis": 0,
      |              "scroll_current": 0
      |            },
      |            "merges": {
      |              "current": 0,
      |              "current_docs": 0,
      |              "current_size": "0b",
      |              "current_size_in_bytes": 0,
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0,
      |              "total_docs": 0,
      |              "total_size": "0b",
      |              "total_size_in_bytes": 0,
      |              "total_stopped_time": "0s",
      |              "total_stopped_time_in_millis": 0,
      |              "total_throttled_time": "0s",
      |              "total_throttled_time_in_millis": 0,
      |              "total_auto_throttle": "20mb",
      |              "total_auto_throttle_in_bytes": 20971520
      |            },
      |            "refresh": {
      |              "total": 1,
      |              "total_time": "80ms",
      |              "total_time_in_millis": 80
      |            },
      |            "flush": {
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "warmer": {
      |              "current": 0,
      |              "total": 4,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "query_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "total_count": 0,
      |              "hit_count": 0,
      |              "miss_count": 0,
      |              "cache_size": 0,
      |              "cache_count": 0,
      |              "evictions": 0
      |            },
      |            "fielddata": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0
      |            },
      |            "percolate": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0,
      |              "memory_size_in_bytes": -1,
      |              "memory_size": "-1b",
      |              "queries": 0
      |            },
      |            "completion": {
      |              "size": "0b",
      |              "size_in_bytes": 0
      |            },
      |            "segments": {
      |              "count": 1,
      |              "memory": "1.6kb",
      |              "memory_in_bytes": 1737,
      |              "terms_memory": "1.2kb",
      |              "terms_memory_in_bytes": 1269,
      |              "stored_fields_memory": "312b",
      |              "stored_fields_memory_in_bytes": 312,
      |              "term_vectors_memory": "0b",
      |              "term_vectors_memory_in_bytes": 0,
      |              "norms_memory": "64b",
      |              "norms_memory_in_bytes": 64,
      |              "doc_values_memory": "92b",
      |              "doc_values_memory_in_bytes": 92,
      |              "index_writer_memory": "0b",
      |              "index_writer_memory_in_bytes": 0,
      |              "index_writer_max_memory": "19.7mb",
      |              "index_writer_max_memory_in_bytes": 20759183,
      |              "version_map_memory": "0b",
      |              "version_map_memory_in_bytes": 0,
      |              "fixed_bit_set": "0b",
      |              "fixed_bit_set_memory_in_bytes": 0
      |            },
      |            "translog": {
      |              "operations": 1,
      |              "size": "100b",
      |              "size_in_bytes": 100
      |            },
      |            "suggest": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0
      |            },
      |            "request_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0,
      |              "hit_count": 0,
      |              "miss_count": 0
      |            },
      |            "recovery": {
      |              "current_as_source": 0,
      |              "current_as_target": 0,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "commit": {
      |              "id": "0KEgzr3H8IYfFwjGYMMyuQ==",
      |              "generation": 1,
      |              "user_data": {
      |                "translog_generation": "1",
      |                "translog_uuid": "gydasAvsTN2RrsxbtrGV9w"
      |              },
      |              "num_docs": 0
      |            },
      |            "shard_path": {
      |              "state_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "data_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "is_custom_data_path": false
      |            }
      |          }
      |        ],
      |        "4": [
      |          {
      |            "routing": {
      |              "state": "STARTED",
      |              "primary": true,
      |              "node": "MCGlWc6ERF2N9pO0uh7-tA",
      |              "relocating_node": null
      |            },
      |            "docs": {
      |              "count": 0,
      |              "deleted": 0
      |            },
      |            "store": {
      |              "size": "130b",
      |              "size_in_bytes": 130,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "indexing": {
      |              "index_total": 0,
      |              "index_time": "0s",
      |              "index_time_in_millis": 0,
      |              "index_current": 0,
      |              "index_failed": 0,
      |              "delete_total": 0,
      |              "delete_time": "0s",
      |              "delete_time_in_millis": 0,
      |              "delete_current": 0,
      |              "noop_update_total": 0,
      |              "is_throttled": false,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "get": {
      |              "total": 0,
      |              "get_time": "0s",
      |              "time_in_millis": 0,
      |              "exists_total": 0,
      |              "exists_time": "0s",
      |              "exists_time_in_millis": 0,
      |              "missing_total": 0,
      |              "missing_time": "0s",
      |              "missing_time_in_millis": 0,
      |              "current": 0
      |            },
      |            "search": {
      |              "open_contexts": 0,
      |              "query_total": 0,
      |              "query_time": "0s",
      |              "query_time_in_millis": 0,
      |              "query_current": 0,
      |              "fetch_total": 0,
      |              "fetch_time": "0s",
      |              "fetch_time_in_millis": 0,
      |              "fetch_current": 0,
      |              "scroll_total": 0,
      |              "scroll_time": "0s",
      |              "scroll_time_in_millis": 0,
      |              "scroll_current": 0
      |            },
      |            "merges": {
      |              "current": 0,
      |              "current_docs": 0,
      |              "current_size": "0b",
      |              "current_size_in_bytes": 0,
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0,
      |              "total_docs": 0,
      |              "total_size": "0b",
      |              "total_size_in_bytes": 0,
      |              "total_stopped_time": "0s",
      |              "total_stopped_time_in_millis": 0,
      |              "total_throttled_time": "0s",
      |              "total_throttled_time_in_millis": 0,
      |              "total_auto_throttle": "20mb",
      |              "total_auto_throttle_in_bytes": 20971520
      |            },
      |            "refresh": {
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "flush": {
      |              "total": 0,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "warmer": {
      |              "current": 0,
      |              "total": 2,
      |              "total_time": "0s",
      |              "total_time_in_millis": 0
      |            },
      |            "query_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "total_count": 0,
      |              "hit_count": 0,
      |              "miss_count": 0,
      |              "cache_size": 0,
      |              "cache_count": 0,
      |              "evictions": 0
      |            },
      |            "fielddata": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0
      |            },
      |            "percolate": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0,
      |              "memory_size_in_bytes": -1,
      |              "memory_size": "-1b",
      |              "queries": 0
      |            },
      |            "completion": {
      |              "size": "0b",
      |              "size_in_bytes": 0
      |            },
      |            "segments": {
      |              "count": 0,
      |              "memory": "0b",
      |              "memory_in_bytes": 0,
      |              "terms_memory": "0b",
      |              "terms_memory_in_bytes": 0,
      |              "stored_fields_memory": "0b",
      |              "stored_fields_memory_in_bytes": 0,
      |              "term_vectors_memory": "0b",
      |              "term_vectors_memory_in_bytes": 0,
      |              "norms_memory": "0b",
      |              "norms_memory_in_bytes": 0,
      |              "doc_values_memory": "0b",
      |              "doc_values_memory_in_bytes": 0,
      |              "index_writer_memory": "0b",
      |              "index_writer_memory_in_bytes": 0,
      |              "index_writer_max_memory": "19.7mb",
      |              "index_writer_max_memory_in_bytes": 20759183,
      |              "version_map_memory": "0b",
      |              "version_map_memory_in_bytes": 0,
      |              "fixed_bit_set": "0b",
      |              "fixed_bit_set_memory_in_bytes": 0
      |            },
      |            "translog": {
      |              "operations": 0,
      |              "size": "43b",
      |              "size_in_bytes": 43
      |            },
      |            "suggest": {
      |              "total": 0,
      |              "time": "0s",
      |              "time_in_millis": 0,
      |              "current": 0
      |            },
      |            "request_cache": {
      |              "memory_size": "0b",
      |              "memory_size_in_bytes": 0,
      |              "evictions": 0,
      |              "hit_count": 0,
      |              "miss_count": 0
      |            },
      |            "recovery": {
      |              "current_as_source": 0,
      |              "current_as_target": 0,
      |              "throttle_time": "0s",
      |              "throttle_time_in_millis": 0
      |            },
      |            "commit": {
      |              "id": "0KEgzr3H8IYfFwjGYMMyuw==",
      |              "generation": 1,
      |              "user_data": {
      |                "translog_generation": "1",
      |                "translog_uuid": "RBwchy8ITGe4TIpAmvCzkw"
      |              },
      |              "num_docs": 0
      |            },
      |            "shard_path": {
      |              "state_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "data_path": "/Users/leonardo.menezes/Downloads/elasticsearch-2.3.0/data/elasticsearch/nodes/0",
      |              "is_custom_data_path": false
      |            }
      |          }
      |        ]
      |      }
      |    }
      |  }
      |}
    """.stripMargin
  )

  val expectedRecovery = Json.obj()

}
