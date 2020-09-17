#!/bin/bash

# Adding groups organizational unit
docker exec ldap ldapadd -x -D "cn=admin,dc=example,dc=org" -w admin -f /opt/ous.ldif

# Adding test user
docker exec ldap ldapadd -x -D "cn=admin,dc=example,dc=org" -w admin -f /opt/test-user.ldif -H ldap://localhost -ZZ

# Add group cerebro
docker exec ldap ldapadd -x -D "cn=admin,dc=example,dc=org" -w admin -f /opt/add_group.ldif