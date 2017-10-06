package services.overview

import _root_.util.DataSize
import play.api.libs.json._

object ClusterOverview {

  def apply(clusterSettings: JsValue, health: JsValue,
            nodes: JsValue, indices: JsValue, shards: JsValue, aliases: JsValue): JsValue = {

    val persistentAllocation = (clusterSettings \ "persistent" \ "cluster" \ "routing" \ "allocation" \ "enable").asOpt[String].getOrElse("all")
    val transientAllocation = (clusterSettings \ "transient" \ "cluster" \ "routing" \ "allocation" \ "enable").asOpt[String]
    val shardAllocation = transientAllocation.getOrElse(persistentAllocation).equals("all")

    def updateShardState(state: String) = __.json.update(
      __.read[JsObject].map{ o => o ++ Json.obj( "state" -> JsString(state) ) }
    )

    val shardMap = (shards.as[JsArray].value.flatMap {
      case shard =>
        val index = (shard \ "index").as[String]
        val node = (shard \ "node").asOpt[String].getOrElse("unassigned")
        // TODO: prune node/index from shard?
        if ((shard \ "state").as[String].equals("RELOCATING")) {
          val relocation = node.split(" ")
          val origin = relocation.head
          val target = relocation.last
          val initializingShard = shard.transform(updateShardState("INITIALIZING")) match {
            case JsSuccess(data, _) => data
            case JsError(error) => throw new RuntimeException("boom") // TODO proper exception
          }
          Seq(
            (index -> (origin -> shard)),
            (index -> (target -> initializingShard))
          )
        } else {
          Seq(index -> (node -> shard))
        }
    }).groupBy(_._1).mapValues(v => v.map(_._2).groupBy(_._1).mapValues(v => JsArray(v.map(_._2))))

    val aliasesMap = aliases.as[JsArray].value.map {
      alias => (alias \ "index").as[String] -> (alias \ "alias").as[JsValue]
    }.groupBy(_._1).mapValues(a => JsArray(a.map(_._2)))



    def addAliasAndShards(index: String) = __.json.update {
      val aliases = JsObject(Map("aliases" -> aliasesMap.getOrElse(index, JsNull)))
      val shards = JsObject(Map("shards" -> JsObject(shardMap.getOrElse(index, Map()))))
      __.read[JsObject].map { o => o ++ aliases ++ shards }
    }

    var sizeInBytes = 0l
    var docsCount = 0
    var closedIndices = 0
    var specialIndices = 0

    val withIndices = indices.as[JsArray].value.map { index =>
      val indexName = (index \ "index").as[String]
      // TODO if ES returned a number
      docsCount = docsCount + (index \ "docs.count").asOpt[String].map(_.toInt).getOrElse(0)
      // TODO if ES returned in bytes...
      sizeInBytes = sizeInBytes + (index \ "store.size").asOpt[String].map(DataSize.apply).getOrElse(0l)
      if ((index \ "status").as[String].equals("close"))
        closedIndices = closedIndices + 1
      if (indexName.startsWith("."))
        specialIndices = specialIndices + 1

      index.transform(addAliasAndShards(indexName)) match {
        case JsSuccess(data, _) => data
        case JsError(error) => throw new RuntimeException("boom") // TODO proper exception
      }
    }

    JsObject(Seq(
      "health" -> health,
      "indices" -> JsArray(withIndices),
      "nodes" -> nodes,
      "shard_allocation" -> JsBoolean(shardAllocation),
      "docs_count" -> JsNumber(BigDecimal(docsCount)),
      "size_in_bytes" -> JsNumber(BigDecimal(sizeInBytes)),
      "closed_indices" -> JsNumber(BigDecimal(closedIndices)),
      "special_indices" -> JsNumber(BigDecimal(specialIndices))
    ))
  }

}
