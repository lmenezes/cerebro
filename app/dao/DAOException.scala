package dao

case class DAOException(message: String, exception: Throwable) extends RuntimeException(message, exception)
