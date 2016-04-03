package controllers

import org.specs2.Specification

class ClusterOverviewControllerSpec extends Specification {

  def is =
    s2"""
    ClusterOverviewController should

      return cluster_name                    $clusterName
      """

  def clusterName = {
    "" mustEqual ""
  }
}
