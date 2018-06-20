package models.overview

import play.api.libs.json.Json

object IndexRoutingTable {

  val healthyShards = Json.parse(
    """
      |{
      |  "shards": {
      |    "0": [
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
      |    "1": [
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
      |      }
      |    ],
      |    "2": [
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
      |      }
      |    ],
      |    "3": [
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
      |    ],
      |    "4": [
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
      |      }
      |    ]
      |  }
      |}
    """.stripMargin
  )

  val relocatingShard = Json.parse(
    """
      |{
      |  "shards": {
      |    "0": [
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
      |    "1": [
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
      |      }
      |    ],
      |    "2": [
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
      |      }
      |    ],
      |    "3": [
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
      |    ],
      |    "4": [
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
      |      }
      |    ]
      |  }
      |}
    """.stripMargin
  )

  val unassignedShard = Json.parse(
    """
      |{
      |  "shards": {
      |    "0": [
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
      |    "1": [
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
      |      }
      |    ],
      |    "2": [
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
      |      }
      |    ],
      |    "3": [
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
      |    ],
      |    "4": [
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
      |    ]
      |  }
      |}
    """.stripMargin
  )

}
