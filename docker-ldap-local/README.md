# Test LDAP

## Setup

1. Run `docker-compose up`
2. Access admin page via `https://localhost:6443`
3. Configuration `ldap/directory.ldif`
    - Bind DN: `cn=admin,dc=example,dc=org`
    - Password: `password`
    - Root DN: `dc=example,dc=org`
    - Host: `ldap://localhost:389` or `ldap://172.22.1.1:389`
    - `aadmin` is in the `Administrator` and `Developers` groups.
    - `jroe` and `jdoe` are in the `Developers` group.

## LDAP Search Filters Examples

``` console
$ ldapsearch -LLL -H <ldap_host>  -b <search_base_dn> -D <bind_dn> -w <bind_password> "<search_filters>"
```

### Verify "aadmin" a member of Administrator group

```console
$ ldapsearch -LLL -H ldap://localhost:389 -b "dc=example,dc=org" -D "cn=admin,dc=example,dc=org" -w "password" "(&(objectClass=inetOrgPerson)(memberOf=cn=Administrator,ou=Groups,dc=example,dc=org)(cn=aadmin))"

dn: cn=aadmin,ou=People,dc=example,dc=org
objectClass: person
objectClass: inetOrgPerson
objectClass: organizationalPerson
objectClass: top
cn: aadmin
userPassword:: cGFzc3dvcmQ=
givenName: Ann
sn: Admin
mail: aadmin@example.org
uid: 1003
```

### Display all organizational unit

```console
$ ldapsearch -LLL -H ldap://localhost:389 -b "dc=example,dc=org" -D "cn=admin,dc=example,dc=org" -w "password" "objectclass=OrganizationalUnit" ou

dn: ou=Groups,dc=example,dc=org
ou: Groups

dn: ou=People,dc=example,dc=org
ou: People
```

### Display available Groups

```console
$ ldapsearch -LLL -H ldap://localhost:389 -b "dc=example,dc=org" -D "cn=admin,dc=example,dc=org" -w "password" "ou=Groups" cn

dn: ou=Groups,dc=example,dc=org

dn: cn=Administrator,ou=Groups,dc=example,dc=org
cn: Administrator

dn: cn=Developers,ou=Groups,dc=example,dc=org
cn: Developers
```

### Display members of Developers group

```console
$ ldapsearch -LLL -H ldap://localhost:389 -b "dc=example,dc=org" -D "cn=admin,dc=example,dc=org" -w "password" "cn=Developers" uniqueMember

dn: cn=Developers,ou=Groups,dc=example,dc=org
uniqueMember: cn=aadmin,ou=People,dc=example,dc=org
uniqueMember: cn=jroe,ou=People,dc=example,dc=org
uniqueMember: cn=jdoe,ou=People,dc=example,dc=org
```

### Display uniqueMembers of each Groups

```console
$ ldapsearch -LLL -H ldap://localhost:389 -b "dc=example,dc=org" -D "cn=admin,dc=example,dc=org" -w "password" "ou=Groups" cn uniqueMember

dn: ou=Groups,dc=example,dc=org

dn: cn=Administrator,ou=Groups,dc=example,dc=org
cn: Administrator
uniqueMember: cn=aadmin,ou=People,dc=example,dc=org

dn: cn=Developers,ou=Groups,dc=example,dc=org
cn: Developers
uniqueMember: cn=aadmin,ou=People,dc=example,dc=org
uniqueMember: cn=jroe,ou=People,dc=example,dc=org
uniqueMember: cn=jdoe,ou=People,dc=example,dc=org
```

### List groups "aadmin" is a member of

```console
$ ldapsearch -LLL -H ldap://localhost:389 -b "dc=example,dc=org" -D "cn=admin,dc=example,dc=org" -w "password" "cn=aadmin" memberOf

dn: cn=aadmin,ou=People,dc=example,dc=org
memberOf: cn=Administrator,ou=Groups,dc=example,dc=org
memberOf: cn=Developers,ou=Groups,dc=example,dc=org
```

## References:
- [OpenDistro Active Directory and LDAP](https://opendistro.github.io/for-elasticsearch-docs/docs/security/configuration/ldap/#docker-example)
- [How To Search LDAP using ldapsearch (With Examples)](https://devconnected.com/how-to-search-ldap-using-ldapsearch-examples/)
- [Apache Directory Studio](https://directory.apache.org/studio/)
