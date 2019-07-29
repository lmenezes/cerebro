package models.overview

import org.specs2.Specification
import play.api.libs.json.Json

object IndexSpec extends Specification {

  def is =
    s2"""
    Index should

      build a healthy index                    $healthy
      build an index with relocating shards    $relocating
      build an index with unassigned shards    $unassigned
      build a special index                    $special
      build a closed index                     $closed

      """

  def healthy = {
    val expected = Json.parse(
      """
        |{
        |  "name": "ipsum",
        |  "closed": false,
        |  "special": false,
        |  "unhealthy": false,
        |  "doc_count": 62064,
        |  "deleted_docs": 0,
        |  "size_in_bytes": 163291998,
        |  "total_size_in_bytes": 326583996,
        |  "aliases": [
        |    "fancyAlias"
        |  ],
        |  "num_shards": 5,
        |  "num_replicas": 0,
        |  "shards": {
        |    "ZqGi3UPESiSa0Z4Sf4NlPg": [
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 4,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "oWmBTuCFSuGA4krn5diK3w"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 1,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "YUY5QiPmQJulsereqC1VBQ"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 0,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LEm_TRI3TFuH3icSnvkvQg"
        |        }
        |      }
        |    ],
        |    "H-4gqX87SYqmQKtsatg92w": [
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 2,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LXEh1othSz6IE5ueTITF-Q"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 3,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "6X6SMPvvQbOdUct5k3bo6w"
        |        }
        |      }
        |    ]
        |  }
        |}
      """.stripMargin
    )
    val index = Index("ipsum", IndexStats.stats, IndexRoutingTable.healthyShards, IndexAliases.aliases, Json.obj())
    index mustEqual expected
  }

  def relocating = {
    val expected = Json.parse(
      """
        |{
        |  "name": "ipsum",
        |  "closed": false,
        |  "special": false,
        |  "unhealthy": true,
        |  "doc_count": 62064,
        |  "deleted_docs": 0,
        |  "size_in_bytes": 163291998,
        |  "total_size_in_bytes": 326583996,
        |  "aliases": [
        |    "fancyAlias"
        |  ],
        |  "num_shards": 5,
        |  "num_replicas": 0,
        |  "shards": {
        |    "ZqGi3UPESiSa0Z4Sf4NlPg": [
        |      {
        |        "state": "RELOCATING",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": "H-4gqX87SYqmQKtsatg92w",
        |        "shard": 4,
        |        "index": "some",
        |        "expected_shard_size_in_bytes": 32860995,
        |        "allocation_id": {
        |          "id": "oWmBTuCFSuGA4krn5diK3w",
        |          "relocation_id": "fSkjawIwQ7e2LuVGE9X1MQ"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 1,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "YUY5QiPmQJulsereqC1VBQ"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 0,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LEm_TRI3TFuH3icSnvkvQg"
        |        }
        |      }
        |    ],
        |    "H-4gqX87SYqmQKtsatg92w": [
        |      {
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "index": "some",
        |        "state": "INITIALIZING",
        |        "shard": 4,
        |        "primary": false
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 2,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LXEh1othSz6IE5ueTITF-Q"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 3,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "6X6SMPvvQbOdUct5k3bo6w"
        |        }
        |      }
        |    ]
        |  }
        |}
      """.stripMargin
    )
    val index = Index("ipsum", IndexStats.stats, IndexRoutingTable.relocatingShard, IndexAliases.aliases, Json.obj())
    index mustEqual expected
  }

  def unassigned = {
    val expected = Json.parse(
      """
        |{
        |  "name": "ipsum",
        |  "closed": false,
        |  "special": false,
        |  "unhealthy": true,
        |  "doc_count": 62064,
        |  "deleted_docs": 0,
        |  "size_in_bytes": 163291998,
        |  "total_size_in_bytes": 326583996,
        |  "aliases": [
        |    "fancyAlias"
        |  ],
        |  "num_shards": 5,
        |  "num_replicas": 0,
        |  "shards": {
        |    "ZqGi3UPESiSa0Z4Sf4NlPg": [
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 1,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "YUY5QiPmQJulsereqC1VBQ"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 0,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LEm_TRI3TFuH3icSnvkvQg"
        |        }
        |      }
        |    ],
        |    "unassigned": [
        |      {
        |        "state": "UNASSIGNED",
        |        "primary": false,
        |        "node": null,
        |        "relocating_node": null,
        |        "shard": 4,
        |        "index": "some",
        |        "recovery_source": {
        |          "type": "PEER"
        |        },
        |        "unassigned_info": {
        |          "reason": "REPLICA_ADDED",
        |          "at": "2018-01-04T10:10:14.154Z",
        |          "delayed": false,
        |          "allocation_status": "no_attempt"
        |        }
        |      }
        |    ],
        |    "H-4gqX87SYqmQKtsatg92w": [
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 2,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LXEh1othSz6IE5ueTITF-Q"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 3,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "6X6SMPvvQbOdUct5k3bo6w"
        |        }
        |      }
        |    ]
        |  }
        |}
      """.stripMargin
    )
    val index = Index("ipsum", IndexStats.stats, IndexRoutingTable.unassignedShard, IndexAliases.aliases, Json.obj())
    index mustEqual expected
  }

  def special = {
    val expected = Json.parse(
      """
        |{
        |  "name": ".ipsum",
        |  "closed": false,
        |  "special": true,
        |  "unhealthy": false,
        |  "doc_count": 62064,
        |  "deleted_docs": 0,
        |  "size_in_bytes": 163291998,
        |  "total_size_in_bytes": 326583996,
        |  "aliases": [
        |    "fancyAlias"
        |  ],
        |  "num_shards": 5,
        |  "num_replicas": 0,
        |  "shards": {
        |    "ZqGi3UPESiSa0Z4Sf4NlPg": [
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 4,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "oWmBTuCFSuGA4krn5diK3w"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 1,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "YUY5QiPmQJulsereqC1VBQ"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 0,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LEm_TRI3TFuH3icSnvkvQg"
        |        }
        |      }
        |    ],
        |    "H-4gqX87SYqmQKtsatg92w": [
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 2,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LXEh1othSz6IE5ueTITF-Q"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 3,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "6X6SMPvvQbOdUct5k3bo6w"
        |        }
        |      }
        |    ]
        |  }
        |}
      """.stripMargin
    )
    val index = Index(".ipsum", IndexStats.stats, IndexRoutingTable.healthyShards, IndexAliases.aliases, Json.obj())
    index mustEqual expected
  }

  def closed = {
    val expected = Json.parse(
      """
        |{
        |  "name": "ipsum",
        |  "closed": true,
        |  "special": false,
        |  "unhealthy": false,
        |  "doc_count": 62064,
        |  "deleted_docs": 0,
        |  "size_in_bytes": 163291998,
        |  "total_size_in_bytes": 326583996,
        |  "aliases": [
        |    "fancyAlias"
        |  ],
        |  "num_shards": 5,
        |  "num_replicas": 0,
        |  "shards": {
        |    "ZqGi3UPESiSa0Z4Sf4NlPg": [
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 4,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "oWmBTuCFSuGA4krn5diK3w"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 1,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "YUY5QiPmQJulsereqC1VBQ"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "ZqGi3UPESiSa0Z4Sf4NlPg",
        |        "relocating_node": null,
        |        "shard": 0,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LEm_TRI3TFuH3icSnvkvQg"
        |        }
        |      }
        |    ],
        |    "H-4gqX87SYqmQKtsatg92w": [
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 2,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "LXEh1othSz6IE5ueTITF-Q"
        |        }
        |      },
        |      {
        |        "state": "STARTED",
        |        "primary": true,
        |        "node": "H-4gqX87SYqmQKtsatg92w",
        |        "relocating_node": null,
        |        "shard": 3,
        |        "index": "some",
        |        "allocation_id": {
        |          "id": "6X6SMPvvQbOdUct5k3bo6w"
        |        }
        |      }
        |    ]
        |  }
        |}
      """.stripMargin
    )
    val index = Index("ipsum", IndexStats.stats, IndexRoutingTable.healthyShards, IndexAliases.aliases, IndexBlocks.closed)
    index mustEqual expected
  }

}
