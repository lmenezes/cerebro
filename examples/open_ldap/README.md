# How to configure open ldap authentication

In this tutorial we are focusing in LDAP authentication without validating if the user belongs to a group.

## Setting up the environment

`docker-compose.yml` configured two services: cerebro and an open ldap server (based on osixia/openldap docker image).
So, fist of all service should be run with:

```
docker-compose up -d
```

The open ldap server contains an admin user (username: `admin` / password: `admin`). For testing purpose a new
user is added (username: `test` / password `test`)
```
docker exec ldap ldapadd -x -D "cn=admin,dc=example,dc=org" -w admin -f /opt/test-user.ldif -H ldap://localhost -ZZ
```

In open ldap `test` users looks like this.

```
dn: uid=test,dc=example,dc=org
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

## Setting up cerebro

Based in what it's shown above, the environment variables that cerebro needs are the following:

```
- AUTH_TYPE=ldap
- LDAP_METHOD=simple
- LDAP_URL=ldap://ldap:389
- LDAP_BASE_DN=DC=example,DC=org 
- LDAP_USER_TEMPLATE=uid=%s,%s
```

- `LDAP_URL`: The url to an LDAP server. In the example is `ldap://ldap:389` because the container name configured in the `docker-compose` file is `ldap`
- `LDAP_BASE_DN`: It's the base DN where users belong to. In the example `test` users belong to `dc=example,dc=org`
- `LDAP_USER_TEMPLATE`: Since it's weird to ask the user to input the full `dn` (`test` user is `uid=test,dc=example,dc=org`)
 cerebro uses a template. Typically it's expected that the user only types the username, in this case `test`. That's why
 it's configured with `uid=%s,%s`. This means that the final `dn` will be the result of replacing the first `%s` by the 
 user's input and the second with the `LDAP_BASE_DN`     