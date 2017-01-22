Cerebro
------------

cerebro is an open source(MIT License) elasticsearch web admin tool.

## Requirements

cerebro needs Java 1.8 or newer to run.

##Installation
- Download from [https://github.com/lmenezes/cerebro/releases](https://github.com/lmenezes/cerebro/releases)
- Extract files
- Run bin/cerebro(or bin/cerebro.bat if on Windows)
- Access on http://localhost:9000

##Configuration

Some settings in cerebro can be set by specifying them as Java System properties, while others need to be specified on the configuration file(conf/application.conf).

For an extensive list of Java System properties accepted, check https://www.playframework.com/documentation/2.5.x/ProductionConfiguration

### Init script

You can run Cerebro with service cerebro start|status|stop|force_stop.

If you don't use Apache, delete or comment this line (43) :
```
/etc/init.d/httpd reload >> /dev/null 2>> /dev/null & 
```

Copy this file in /etc/init.d/ and this command:
```
chmod 755 /etc/init.d/cerebro
```

### HTTP server address and port
You can run cerebro listening on a different port(9000) and host(0.0.0.0):
```
bin/cerebro -Dhttp.port=1234 -Dhttp.address=127.0.0.1
```

### Path of RUNNING_PID
By default, the RUNNING_PID is placed on the root directory of cerebro, but it is recommendable to place it somewhere that is cleared on restart(/var/run). Make sure the location exists and that cerebro has write permissions to it.

```
bin/cerebro -Dpidfile.path=/var/run/cerebro.pid
```

It is also possible to avoid the creation of the RUNNING_PID file by setting the path to /dev/null on the configuration file:

```yaml
pidfile.path = "/dev/null"
```
### Using an alternate configuration file
It is possible to define an alternate configuration file(other than conf/application.conf). This can be achieved in two different ways:

#### -Dconfig.resource
This will pick the specified file from the classpath.
```
bin/cerebro -Dconfig.resource=alternate.conf 
```

#### -Dconfig.file
This will pick the specified file from a directory other than the apps dir.
```
bin/cerebro -Dconfig.fiel=/some/other/dir/alternate.conf 
```


### List of known hosts
A list of predefined hosts can be defined for quicker access by editing conf/application.conf file. If host is password protected, authentication should be also set.

Example:

```yaml
hosts: [
	{
		host: http://localhost:9200
	},
	{
    	host = "http://some-authenticated-host:9200",
  		auth = {
       		username = "username"
			password = "secret-password"
	}
]
```

### User authentication
It is possible to control access to cerebro through authentication.

At the moment, there are no roles/permission level, and either an user is able to access or not.

There are two methods of authentication:

  - Basic: username and password on the configuration file
  - LDAP: connect to an external provider for authentication

Example for basic:
```yaml
auth {
  type: basic
  settings: {
    username = "admin"
    password = "1234"
  }
}
```

Example for LDAP:

```yaml
auth {
  type: ldap
  settings: {
    url = "ldap://host:port"
    base-dn = "ou=active,ou=Employee"
    method  = "simple"
    user-domain = "domain.com"
  }
}
```
