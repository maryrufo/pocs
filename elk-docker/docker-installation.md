# Docker Installation

1. Set up the repository : https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository

- Update the apt package index and install packages to allow apt to use a repository over HTTPS:

$ sudo apt-get update
$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg
	
- Add Docker’s official GPG key:

$ sudo install -m 0755 -d /etc/apt/keyrings
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
$ sudo chmod a+r /etc/apt/keyrings/docker.gpg

- Use the following command to set up the repository:

$ echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


2. Install Docker Engine

- Update the apt package index:

$ sudo apt-get update

- Install Docker Engine, containerd, and Docker Compose.

$ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

- Verify that the Docker Engine installation is successful by running the hello-world image:

$ sudo docker run hello-world

$ sudo docker --version
Docker version 23.0.5, build bc4487a


3. Manage Docker as a non-root user : https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user

Create the docker group.
$ sudo groupadd docker
Add your user to the docker group.
$ sudo usermod -aG docker $USER
To activate the changes to groups.
$ newgrp docker
Verify that you can run docker commands without sudo.
$ docker run hello-world


4. Install Docker Compose https://docs.docker.com/compose/install/other/

Install the Compose standalone

$ sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ docker-compose --version
docker-compose version 1.23.2, build 1110ad01


Uninstall to update to latest version

This command must return a result, in order to check it is installed here :
$ ls -l /usr/local/bin/docker-compose
Remove the old version :
$ sudo rm -rf docker-compose
Install
$ sudo curl -SL https://github.com/docker/compose/releases/download/v2.17.2/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
$ docker compose version
Docker Compose version v2.17.3
