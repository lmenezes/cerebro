package services.overview

import org.specs2.Specification

object ClusterOverviewSpec extends Specification {

  def is =
    s2"""
    ClusterOverview should

      return cluster_name                    $clusterName
      return number of nodes                 $numberOfNodes
      return number of active primary shards $activePrimaryShards
      return number of active shards         $activeShards
      return number of relocating shards     $relocatingShards
      return number of initializing shards   $initializingShards
      return number of unassigned shards     $unassignedShards
      return cluster doc count               $docsCount
      return cluster size in bytes           $sizeInBytes
      return number of closed indices        $closedIndices
      return number of special indices       $specialIndices
      return state of shard allocation       $shardAllocation
      """

  val clusterWithoutData = ClusterWithoutData()
  val clusterWithData = ClusterWithData()
  val clusterInitializing = ClusterInitializingShards()
  val clusterRelocating = ClusterRelocatingShards()
  val clusterDiabledAllocation = ClusterDisabledAllocation()

  def clusterName = {
    (clusterWithoutData \ "health" \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterWithData \ "health" \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterInitializing \ "health" \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterRelocating \ "health" \ "cluster_name").as[String] mustEqual "elasticsearch"
  }

  def numberOfNodes = {
    (clusterWithoutData \ "health" \ "number_of_nodes").as[Int] mustEqual 2
    (clusterWithData \ "health" \ "number_of_nodes").as[Int] mustEqual 2
    (clusterInitializing \ "health" \ "number_of_nodes").as[Int] mustEqual 2
    (clusterRelocating \ "health" \ "number_of_nodes").as[Int] mustEqual 2
  }

  def activePrimaryShards = {
    (clusterWithoutData \ "health" \ "active_primary_shards").as[Int] mustEqual 0
    (clusterWithData \ "health" \ "active_primary_shards").as[Int] mustEqual 8
    (clusterInitializing \ "health" \ "active_primary_shards").as[Int] mustEqual 5
    (clusterRelocating \ "health" \ "active_primary_shards").as[Int] mustEqual 5
  }

  def activeShards = {
    (clusterWithoutData \ "health" \ "active_shards").as[Int] mustEqual 0
    (clusterWithData \ "health" \ "active_shards").as[Int] mustEqual 11
    (clusterInitializing \ "health" \ "active_shards").as[Int] mustEqual 5
    (clusterRelocating \ "health" \ "active_primary_shards").as[Int] mustEqual 5
  }

  def relocatingShards = {
    (clusterWithoutData \ "health" \ "relocating_shards").as[Int] mustEqual 0
    (clusterWithData \ "health" \ "relocating_shards").as[Int] mustEqual 0
    (clusterInitializing \ "health" \ "relocating_shards").as[Int] mustEqual 0
    (clusterRelocating \ "health" \ "relocating_shards").as[Int] mustEqual 1
  }

  def initializingShards = {
    (clusterWithoutData \ "health" \ "initializing_shards").as[Int] mustEqual 0
    (clusterWithData \ "health" \ "initializing_shards").as[Int] mustEqual 0
    (clusterInitializing \ "health" \ "initializing_shards").as[Int] mustEqual 4
    (clusterRelocating \ "health" \ "initializing_shards").as[Int] mustEqual 0
  }

  def unassignedShards = {
    (clusterWithoutData \ "health" \ "unassigned_shards").as[Int] mustEqual 0
    (clusterWithData \ "health" \ "unassigned_shards").as[Int] mustEqual 0
    (clusterInitializing \ "health" \ "unassigned_shards").as[Int] mustEqual 1
    (clusterRelocating \ "health" \ "unassigned_shards").as[Int] mustEqual 0
  }

  def docsCount = {
    (clusterWithoutData \ "docs_count").as[Int] mustEqual 0
    (clusterWithData \ "docs_count").as[Int] mustEqual 3
    (clusterInitializing \ "docs_count").as[Int] mustEqual 108680
    (clusterRelocating \ "docs_count").as[Int] mustEqual 0
  }

  def sizeInBytes = {
    (clusterWithoutData \ "size_in_bytes").as[Int] mustEqual 0
    (clusterWithData \ "size_in_bytes").as[Int] mustEqual 16184
    (clusterInitializing \ "size_in_bytes").as[Int] mustEqual 2026271
    (clusterRelocating \ "size_in_bytes").as[Int] mustEqual 650
  }

  def closedIndices = {
    (clusterWithoutData \ "closed_indices").as[Int] mustEqual 0
    (clusterWithData \ "closed_indices").as[Int] mustEqual 1
    (clusterInitializing \ "closed_indices").as[Int] mustEqual 0
    (clusterRelocating \ "closed_indices").as[Int] mustEqual 0
  }

  def specialIndices = {
    (clusterWithoutData \ "special_indices").as[Int] mustEqual 0
    (clusterWithData \ "special_indices").as[Int] mustEqual 1
    (clusterInitializing \ "special_indices").as[Int] mustEqual 0
    (clusterRelocating \ "special_indices").as[Int] mustEqual 0
  }

  def shardAllocation = {
    (clusterWithData \ "shard_allocation").as[Boolean] mustEqual true
    (clusterDiabledAllocation \ "shard_allocation").as[Boolean] mustEqual false
  }

}
