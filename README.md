Cerebro
------------

cerebro is an open source(MIT License) elasticsearch web admin tool.

##Installation
- Download from [https://github.com/lmenezes/cerebro/releases](https://github.com/lmenezes/cerebro/releases)
- Extract files
- Run bin/cerebro(or bin/cerebro.bat if on Windows)
- Access on [http://localhost:9000](http://localhost:9000)

##Configuration
You can further customize Cerebro by editing its conf/application.conf file.

###List of known hosts
A list of predefined hosts can be defined for quicker access. If host is password protected, authentication should be also set.

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
