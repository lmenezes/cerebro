# How to configure open ldap authentication with group membership check

This tutorial is a continuation of  [How to configure open ldap authentication](../open_ldap/README.md).
Apart from testing user credentials, it does an additional check to see if the user belongs to a specific group.

## Setting up the environment

`docker-compose.yml` runs two services: cerebro and an open ldap server (based on osixia/openldap docker image).
So, first, services should be run with:

```
docker-compose up -d
```

The open ldap server contains an admin user (username: `admin` / password: `admin`). For testing purposes a new
user is added (username: `test` / password `test`) and a group `cn=cerebro,ou=groups,dc=example,dc=org` where `test` user
belongs to. To do so, run:

```
./add_group.sh
```

If you inspect the ldap server, `test` user looks like this:

```
dn: uid=test,ou=people,dc=example,dc=org
uid: test
cn: test
sn: 3
objectClass: top
objectClass: posixAccount
objectClass: inetOrgPerson
loginShell: /bin/bash
homeDirectory: /home/test
uidNumber: 14583102
gidNumber: 14564100
userPassword:: e1NTSEF9MVVKcENhTUJseXkyOXhuMllqK0VhZGFkSFZCUHhMNVg=
mail: test@example.org
gecos: test User
``` 

And `cerebro` group looks like this:

```
dn: cn=cerebro,ou=groups,dc=example,dc=org
objectClass: groupOfUniqueNames
cn: cerebro
description: All users
uniqueMember: uid=test,ou=people,dc=example,dc=org
```

## Setting up cerebro

In the context shown above, cerebro can test that the user has valid credentials and, also, check that the user belongs 
to the cerebro group.
In order to do achieve that we need to use this environment variables:

```
- AUTH_TYPE=ldap
- LDAP_URL=ldap://ldap:389
- LDAP_BASE_DN=ou=people,dc=example,dc=org
- LDAP_METHOD=simple
- LDAP_USER_TEMPLATE=uid=%s,%s
- LDAP_BIND_DN=cn=admin,dc=example,dc=org
- LDAP_BIND_PWD=admin
- LDAP_USER_ATTR=uid
- LDAP_USER_ATTR_TEMPLATE=%s
- LDAP_GROUP=memberof=cn=cerebro,ou=groups,dc=example,dc=org
```

The first environment variables are described in this guide: [How to configure open ldap authentication](../open_ldap/README.md).

Now the focus is shifted in how to check that an user belongs to a group. To do so, these environment variables
are needed.

- `LDAP_BIND_DN`: Internal user that can perform searches. In the example: `cn=admin,dc=example,dc=org`
- `LDAP_BIND_PWD`: Password of the internal user. In the example: `admin`
- `LDAP_USER_ATTR`: name of the attribute that contains the unique identifier of the user. In the example: `uid`
- `LDAP_USER_ATTR_TEMPLATE`: In this case, cerebro doesn't try to build a `dn`, it's trying to build the attribute is defined in `LDAP_USER_ATTR`.
 In the example when the `test` user tries to login, we need to use template `%s` because `uid`s in our ldap data base contains
just a string with the username. If we use for example `mail` attribute (because uid doesn't exist and mail is how we identify 
our users in our company), then this should be configured as `%s@example.org`.  
- `LDAP_GROUP`: Condition that test the membership of an user. In the example: `memberof=cn=cerebro,ou=groups,dc=example,dc=org`

If group membership check keeps failing, we can take into consideration that cerebro performs the following query: `"(& ($LDAP_USER_ATTR:${_ouput_of_appliying_LDAP_USER_ATTR_TEMPLATE}})($LDAP_GROUP))"`.
So according to the example it should look like `"(& (uid=test)(memberof=cn=cerebro,ou=groups,dc=example,dc=org))"` and this 
can be tested with `ldapsearch` command as follows:

```
$ docker exec ldap ldapsearch -LLL -x -D cn=admin,dc=example,dc=org -w admin -b dc=example,dc=org -h 127.0.0.1 "(& (uid=test)(memberof=cn=cerebro,ou=groups,dc=example,dc=org))"

dn: uid=test,ou=people,dc=example,dc=org
uid: test
cn: test
sn: 3
objectClass: top
objectClass: posixAccount
objectClass: inetOrgPerson
loginShell: /bin/bash
homeDirectory: /home/test
uidNumber: 14583102
gidNumber: 14564100
userPassword:: e1NTSEF9MVVKcENhTUJseXkyOXhuMllqK0VhZGFkSFZCUHhMNVg=
mail: test@example.org
gecos: test User
```  