# POC Jenkins - Gerrit - OpenLDAP Integration

## Run from scratch

1. Run without configuration  - comment out lines on Dockerfile
2. Install the following plugins
    - Suggested
        - Folders
        - Timestamper
        - Pipeline
        - Git
        - LDAP
        - OWASP Markup Formatter
        - Workspace Cleanup
        - GitHub Branch Source
        - SSH Build Agents
        - Email Extension
        - Build Timeout
        - Ant
        - Pipeline: GitHub Groovy Libraries
        - Matrix Authorization Strategy
        - Mailer
        - Credentials Binding
        - Gradle
        - Pipeline Graph View
        - PAM Authentication
        - Dark Theme
    - Additional
        - Configuration as code
        - Support Core
        - Docker
        - Maven Integration
3. Add docker cloud and configure maven tool.
4. Export casc config - jenkins.yml
5. Generate Support Core Bundle - plugins.txt


## Run with configurations.

1. Clean up.
    ```
    local$ docker compose down -v
    local$ docker rmi -f local-jenkins:latest
    local$ docker network ls
    local$ docker volume ls
    ```

2. Start services
    ```
    local$ docker compose up -d
    OR
    local$ docker compose build --no-cache
    ```

3. Verify services share the same network.
    ```
    local$ docker network inspect local_default
    ```

4. Acess ldap admin via localhost:6443. Login as "cn=admin,dc=example,dc=org" / password.

5. Access jenkins via localhost:8080. Login as admin / password.

6. Access gerrit via localhost:8081.

7. Add ssh key to gerrit.
    - Generate ssh
        ```
        $ ssh-keygen -t ed25519 -C "your_email@example.com"
        ```
    - Change permission
        ```
        $ chmod 700 ssh
        $ chmod 600 ssh/id_ed25519
        ```
    - On Gerrit > Settings > SSH keys > Add new ssh key > Paste public key. Save.

8. Add new repository.
    - Create a sample maven project
        ```
        $ mvn archetype:generate -DgroupId=com.sample.app -DartifactId=sample-app -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
        ```
    - Browse > Repositories > Create New > sample-app, master
    - Clone repository on local (with commit message hook)
        ```
        $ git clone "ssh://admin@localhost:29418/sample-app" && (cd "sample-app" && mkdir -p `git rev-parse --git-dir`/hooks/ && curl -Lo `git rev-parse --git-dir`/hooks/commit-msg http://localhost:8081/tools/hooks/commit-msg && chmod +x `git rev-parse --git-dir`/hooks/commit-msg)
        $ cd sample-app
        $ git add .
        $ git commit -m "initial commmit"
        $ git push origin HEAD:refs/for/master
        ```
    - Merge changes.

9. On jenkins, run build for sample-app job.

# Docker networks

1. Useful commands
    ```
    $ ip address ls
    $ docker network ls
    $ docker network inspect <network_name>
    $ ns lookup medium.com
    $ docker network inspect host
    $ hostname -I | awk '{print $1}'
    ```

2. Sample compose file.
```
services:
  web:
    container_name: hello_world
    image: nginx
    # ports:
    #   - 8000:80
    network_mode: host

services:
  phobos:
    container_name: phobos
    image: busybox
    command: sleep infinity
    networks:
      - mars
  deimos:
    container_name: deimos
    image: busybox
    command: sleep infinity
    networks:
      - mars
  moon:
    container_name: moon
    image: busybox
    command: sleep infinity
    networks:
      - earth
networks:
  mars:
    name: mars
    driver: bridge
  earth:
    name: earth
    driver: bridge
```

# Jenkins Infrastracture
1. Master Server - controls pipelines and schedule builds
2. Agents - perform the build
    - Agent Types
        - Permanent Agents - dedicated servers for running jobs
        - Cloud Agents - ephemeral/dynamic agents spun up on demand (docker, kubernetes, aws fleet manager)
3. Build Types
    - freestyle build
    - pipelines


# Resources
- Diving Deeper into Docker Networking with Docker Compose https://medium.com/@kesaralive/diving-deeper-into-docker-networking-with-docker-compose-737e3b8a3c8c
- Docker Networking – Basics, Network Types & Examples https://spacelift.io/blog/docker-networking
- https://gerrit-review.googlesource.com/Documentation/intro-gerrit-walkthrough.html
- https://www.jenkins.io/doc/book/managing/nodes/
