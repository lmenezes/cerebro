package controllers

import models.overview.ClusterInitializingShards
import org.specs2.Specification

class ClusterOverviewControllerSpec extends Specification {

  def is =
    s2"""
    ClusterOverviewController should

      return cluster_name                    $clusterName
      """

  def clusterName = {
    (clusterWithoutData \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterWithData \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterInitializing \ "cluster_name").as[String] mustEqual "elasticsearch"
    (clusterRelocating \ "cluster_name").as[String] mustEqual "elasticsearch"
  }
}
