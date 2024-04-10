# SFTP Server

Demonstrate client login to a sftp server via basic auth and ssh keys

## Setup

1. Do clean up. Update `~/.ssh/known_hosts` for unused existing keys.

2. Generate ssh keys on `ssh` folder
	```console
	$ cd ssh
	$ ssh-keygen -t ed25519 -f ssh_host_ed25519_key
	$ ssh-keygen -t rsa -b 4096 -f ssh_host_rsa_key
	$ chmod 400 ssh_host_ed25519_key ssh_host_rsa_key
	```

3. Up the sftp server container
	```console
	$ docker-compose up

	Creating ssh_sftp_1 ... done
	Attaching to ssh_sftp_1
	sftp_1  | [/usr/local/bin/create-sftp-user] Parsing user data: "sftp_user::1001::upload"
	sftp_1  | [/usr/local/bin/create-sftp-user] Creating directory: /home/sftp_user/upload
	sftp_1  | [/entrypoint] Executing sshd
	sftp_1  | Server listening on 0.0.0.0 port 22.
	sftp_1  | Server listening on :: port 22.
	```

### Client login: Login via cli

1. Using private key
	```
	$ sftp -oPort=2222 -oIdentityFile=./ssh/ssh_host_rsa_key  sftp_user@localhost
	```

2. Using basic auth (password)
	```
	$ sftp -oPort=2222 sftp_user@localhost
	sftp_user@localhost password: <enter password>
	```

### Client login: Login via filezilla

1. Install filezilla and putty-tools
	```
	$ sudo apt install filezilla
	$ sudo apt install putty-tools
	```
2. Convert ssh key to ppk
	```
	$ cd ssh
	$ puttygen ssh_host_rsa_key -o ssh_host_rsa_key.ppk
	```
3. Filezilla connection details
    - Protocol: SFTP - SSH File Transfer Protocol
	- Host: localhost
	- Port: 2222
	- Logon Type: Key file
	- User: sftp_user
	- Key file: ./ssh/ssh_host_rsa_key.ppk

## SSH Authentication

To authenticate using SSH keys:
- On the `client side`, a user must have an SSH key pair. Generate first both an SSH private key and a public key.
- On the `remote server`, the public key must be copied to a file within the user’s home directory at `~/.ssh/authorized_keys`. This file contains a list of public keys, one-per-line, that are authorized to log into this account.
- When the user connect to the ssh or sftp server, the server will verify the key for authentication. If everything matches, then the authentication will succeed.
- The `known_hosts` file lets the client authenticate the server; the `authorized_keys` file lets the server authenticate the user

## SFTP vs SSH
- `SFTP` is the `file transfer protocol` that provides secure file access, file transfer, and file management over a reliable data stream.
- `SSH`, also known as Secure Shell or Secure Socket Shell, is a `network protocol` that gives users, particularly system administrators, a secure way to access a computer over an unsecured network.
- Unlike SFTP, SSH is able to exist on its own. SFTP cannot exist without SSH — `SFTP uses SSH` as the binding agent to transfer files securely.
- Typical applications for SSH are remote command-line, login, and remote command execution.

## Encountered error

1. `Host Identification is changed`

	```
	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
	@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
	Someone could be eavesdropping on you right now (man-in-the-middle attack)!
	It is also possible that a host key has just been changed.
	The fingerprint for the ED25519 key sent by the remote host is
	SHA256:XxXxXxXXx.
	Please contact your system administrator.
	Add correct host key in ~/.ssh/known_hosts to get rid of this message.
	Offending ED25519 key in ~/.ssh/known_hosts:5
	Password authentication is disabled to avoid man-in-the-middle attacks.
	Keyboard-interactive authentication is disabled to avoid man-in-the-middle attacks.
	sftp_user@container_ip: Permission denied (publickey,password,keyboard-interactive).
	Connection closed
	```
 - `Solution`: Remove line/s on ~/.ssh/known_hosts (client) containing IP address of the sftp server

2. Connect via ssh

```
$ ssh -i ./ssh/ssh_host_rsa_key sftp_user@localhost
Connection from user sftp_user 172.23.0.1 port 47496: refusing non-sftp session
This service allows sftp connections only.
Connection to localhost closed.
```

## References:
- [DockerHub: atmoz/sftp](https://hub.docker.com/r/atmoz/sftp)
- [StackOverflow: Connect SFTP Server by ssh key](https://stackoverflow.com/questions/61600992/connect-sftp-server-by-ssh-key)
- [What is the difference between authorized_keys and known_hosts file for SSH?](https://security.stackexchange.com/questions/20706/what-is-the-difference-between-authorized-keys-and-known-hosts-file-for-ssh)
- [SSH Essentials: Working with SSH Servers, Clients, and Keys](https://www.digitalocean.com/community/tutorials/ssh-essentials-working-with-ssh-servers-clients-and-keys)
- [Setting Up SFTP Public Key Authentication On The Command Line](https://www.jscape.com/blog/setting-up-sftp-public-key-authentication-command-line)
- [Creating a SSH and SFTP server with docker compose](http://www.inanzzz.com/index.php/post/6fa7/creating-a-ssh-and-sftp-server-with-docker-compose)
- [How to Create an SFTP User with Limited Access on Ubuntu](https://wisdmlabs.com/blog/create-an-sftp-user-with-limited-access-on-ubuntu/)
- [Are SSH and SFTP the Same?](https://www.goanywhere.com/blog/are-ssh-and-sftp-the-same)
- [Secure Shell (SSH)](https://www.techtarget.com/searchsecurity/definition/Secure-Shell)
