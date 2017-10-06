package util

object DataSize {

  final val Units = Seq(
    ("pb" -> 1024 * 1024 * 1024 * 1024 * 1024),
    ("tb" -> 1024 * 1024 * 1024 * 1024),
    ("gb" -> 1024 * 1024 * 1024),
    ("mb" -> 1024 * 1024),
    ("kb" -> 1024),
    ("b" -> 1)
  )

  def apply(size: String): Long = {
    Units.collectFirst {
      case unit if (size.endsWith(unit._1)) => (size.substring(0, size.indexOf(unit._1)).toFloat * unit._2).toLong
    }.getOrElse(0l)
  }

}
