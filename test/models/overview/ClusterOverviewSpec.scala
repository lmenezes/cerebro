package models.overview

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
      return number of indices               $totalIndices
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
    (clusterWithoutData \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterWithData \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterInitializing \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterRelocating \ "cluster_name").as[String] mustEqual "elasticsearch"
  }

  def numberOfNodes = {
    (clusterWithoutData \ "number_of_nodes").as[Int] mustEqual 2
    (clusterWithData \ "number_of_nodes").as[Int] mustEqual 2
    (clusterInitializing \ "number_of_nodes").as[Int] mustEqual 2
    (clusterRelocating \ "number_of_nodes").as[Int] mustEqual 3
  }

  def activePrimaryShards = {
    (clusterWithoutData \ "active_primary_shards").as[Int] mustEqual 0
    (clusterWithData \ "active_primary_shards").as[Int] mustEqual 8
    (clusterInitializing \ "active_primary_shards").as[Int] mustEqual 5
    (clusterRelocating \ "active_primary_shards").as[Int] mustEqual 5
  }

  def activeShards = {
    (clusterWithoutData \ "active_shards").as[Int] mustEqual 0
    (clusterWithData \ "active_shards").as[Int] mustEqual 11
    (clusterInitializing \ "active_shards").as[Int] mustEqual 5
    (clusterRelocating \ "active_primary_shards").as[Int] mustEqual 5
  }

  def relocatingShards = {
    (clusterWithoutData \ "relocating_shards").as[Int] mustEqual 0
    (clusterWithData \ "relocating_shards").as[Int] mustEqual 0
    (clusterInitializing \ "relocating_shards").as[Int] mustEqual 0
    (clusterRelocating \ "relocating_shards").as[Int] mustEqual 2
  }

  def initializingShards = {
    (clusterWithoutData \ "initializing_shards").as[Int] mustEqual 0
    (clusterWithData \ "initializing_shards").as[Int] mustEqual 0
    (clusterInitializing \ "initializing_shards").as[Int] mustEqual 4
    (clusterRelocating \ "initializing_shards").as[Int] mustEqual 0
  }

  def unassignedShards = {
    (clusterWithoutData \ "unassigned_shards").as[Int] mustEqual 0
    (clusterWithData \ "unassigned_shards").as[Int] mustEqual 0
    (clusterInitializing \ "unassigned_shards").as[Int] mustEqual 1
    (clusterRelocating \ "unassigned_shards").as[Int] mustEqual 0
  }

  def docsCount = {
    (clusterWithoutData \ "docs_count").as[Int] mustEqual 0
    (clusterWithData \ "docs_count").as[Int] mustEqual 3
    (clusterInitializing \ "docs_count").as[Int] mustEqual 108680
    (clusterRelocating \ "docs_count").as[Int] mustEqual 108680
  }

  def sizeInBytes = {
    (clusterWithoutData \ "size_in_bytes").as[Int] mustEqual 0
    (clusterWithData \ "size_in_bytes").as[Int] mustEqual 16184
    (clusterInitializing \ "size_in_bytes").as[Int] mustEqual 2026271
    (clusterRelocating \ "size_in_bytes").as[Int] mustEqual 4052542
  }

  def totalIndices = {
    (clusterWithoutData \ "total_indices").as[Int] mustEqual 0
    (clusterWithData \ "total_indices").as[Int] mustEqual 3
    (clusterInitializing \ "total_indices").as[Int] mustEqual 1
    (clusterRelocating \ "total_indices").as[Int] mustEqual 1
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
