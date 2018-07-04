package elastic

import java.net.URI

import com.amazonaws.DefaultRequest
import com.amazonaws.auth.AWS4Signer
import com.amazonaws.auth.AWSCredentials
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.http.HttpMethodName
import scala.collection.JavaConverters._
import java.io.StringReader
import java.io.ByteArrayInputStream
import java.io.InputStream

object AwsSigner {

  def sing(method: String, url: String, headers: Seq[(String, String)], body: Option[String], secret: String, key: String) : Seq[(String, String)]  = {
    
		val uri = URI.create(url)
		
		if(uri.getHost.endsWith(".es.amazonaws.com")) {
		  
  		val credentials: AWSCredentials  = new BasicAWSCredentials(secret, key)
  
  			
  		val host = if(uri.getPort() == -1) {
  		  s"""${uri.getScheme}://${uri.getHost()}"""
  		} else {
  		  s"""${uri.getScheme}://${uri.getHost()}:${uri.getPort()}"""
  		}
  		
  		val pattern =   """^https:\/\/.+\.(.+)\.es\.amazonaws\.com$""".r
  		
  		val region = host match {
  		  case pattern(region) => region
  		}
  
  		val endpoint = uri.getPath();
  		val queryStringOpt = Option(uri.getQuery());
  
  		val params = queryStringOpt
    		.map( queryString => {
      		queryString
      		  .split("&")
      		  .map( text => {
      		    val keyVal = text.split("=", 2)
      		    keyVal(0) -> Seq(keyVal(1)).asJava
      		  })
      		  .toMap
    		})
    		.getOrElse(Map.empty)
    		.asJava
  						
      val content: InputStream  = new ByteArrayInputStream(body.getOrElse("").getBytes)
  		
   	  val request = new DefaultRequest[Unit]("es")
  		request.setHttpMethod(HttpMethodName.fromValue(method))
  		request.setEndpoint(URI.create(host))
  		request.setResourcePath(endpoint)
  		request.setHeaders(headers.toMap[String, String].asJava)
  		request.setParameters(params)
  		request.setContent(content)
  	
  		val signer = new AWS4Signer()
  		signer.setRegionName(region);
  		signer.setServiceName("es");
  		signer.sign(request, credentials);
  		
  		val hdrs = request.getHeaders();
  		
      Seq(
        "Host"  -> hdrs.get("Host"), 
        "Authorization"  -> hdrs.get("Authorization"), 
        "X-Amz-Date"  -> hdrs.get("X-Amz-Date") 
      )

		} else {
		  Seq.empty
		}

  }
		

}