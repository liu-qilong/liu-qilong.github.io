---
title: Setup Windows machine as SSH host
tags:
  - Hinton/Instrument
date: "2023-06-08"
update: "2023-06-11"
link:
  medium: "https://medium.com/@liu-qilong/setup-windows-machine-as-ssh-host-75627200fb46"
  x: "https://x.com/liu_qi_long/status/1846821529197433043"
---

# Setup Windows machine as SSH host

In [the previous blog post](/blog/win-dev-env), I set up the development environment on a Windows machine. I further set it up as a `ssh` server that can be access by my laptop over the internet. Following is the summarization of some critical steps and relevant materials.

## Setup SSH host

### Install OpenSSH

> [Get started with OpenSSH for Windows | Microsoft Learn](https://learn.microsoft.com/en-gb/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui)

Check installation status of OpenSSH:

```
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
```

Install the OpenSSH Client:

```
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
```

Install the OpenSSH Server:

```
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Set PowerShell as the default shell: _(the shell you enter when ssh into this host)_

```
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```

### Launch SSH host

To launch the `ssh` server:

```
Start-Service sshd
```

Optionally, set `ssh` server as automatically start when the computer boots up:
```
Set-Service -Name sshd -StartupType 'Automatic'
```

It may also be helpful to confirm the Firewall rule is configured. It should be created automatically by setup. Run the following to verify:

```
if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
    Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..."
    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
} else {
    Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists."
}
```

Check host username:

> [How do I find my username and servername for windows SSH server - Super User](https://superuser.com/questions/1661724/how-do-i-find-my-username-and-servername-for-windows-ssh-server)

```
$env:USERNAME
```

Check the IP address (the line of IPv4):

```
ipconfig
```

## Connect to host from local network

### Log in via password

In my case, connect to the Windows host from a MacBook:

```
ssh <user name>@<ip address>
```

Enter `yes` to add the host to the local machine's host list. Then the terminal will prompt you to enter the password of the user account on the host.

### Log in via key authentication

If you can log in successfully, we can further setup the public key so that you don't need to enter password again in the future (and it's more secure in fact):

> [Developing on Remote Machines using SSH and Visual Studio Code](https://code.visualstudio.com/docs/remote/ssh)
> [Key-based authentication in OpenSSH for Windows | Microsoft Learn](https://learn.microsoft.com/en-gb/windows-server/administration/openssh/openssh_keymanagement)
> [OpenSSH Server configuration for Windows | Microsoft Learn](https://learn.microsoft.com/en-gb/windows-server/administration/openssh/openssh_server_configuration)

Assuming that you've already generate the key `~/.ssh/id_rsa_dell.pub`. We first add it to local agent. At local terminal run:

```
ssh-add ~/.ssh/id_rsa_dell
```

And then deploy (copy) the key to the host. At local terminal run:

```
export USER_AT_HOST="<user name>@<ip address>"
export PUBKEYPATH="$HOME/.ssh/id_rsa_dell.pub"
ssh $USER_AT_HOST "powershell New-Item -Force -ItemType Directory -Path \"\$HOME\\.ssh\"; Add-Content -Force -Path \"\$HOME\\.ssh\\authorized_keys\" -Value '$(tr -d '\n\r' < "$PUBKEYPATH")'"
```

_P.S. If the account you'd like to log in is an administrator account, you need to run:_

```
export USER_AT_HOST="<user name>@<ip address>"
export PUBKEYPATH="$HOME/.ssh/id_rsa_dell.pub"
ssh $USER_AT_HOST "powershell New-Item -Force -ItemType Directory -Path \"\$HOME\\.ssh\"; Add-Content -Force -Path \"\$env:ProgramData\ssh\administrators_authorized_keys\" -Value '$(tr -d '\n\r' < "$PUBKEYPATH")'"
```

_And then at host run:_

```
icacls.exe "C:\ProgramData\ssh\administrators_authorized_keys" /inheritance:r /grant "Administrators:F" /grant "SYSTEM:F"
```

After deploying the key to the host, we can configure the host server to enable key authentication. At the host run:

```
notepad C:\ProgramData\ssh\sshd_config
```

Make sure that this line is in the file (without `#` at the beginning):
```
PubkeyAuthentication yes
```

Then restart the `ssh` service:

```
Restart-Service sshd
```

You should now be able to log in the the host without password.

### `ssh` via Visual Studio Code

> [Developing on Remote Machines using SSH and Visual Studio Code](https://code.visualstudio.com/docs/remote/ssh)
> [Visual Studio Code Remote Development Troubleshooting Tips and Tricks](https://code.visualstudio.com/docs/remote/troubleshooting#_improving-security-on-multi-user-servers)

It's very convenient to `ssh` via Visual Studio Code for remote development. However, the host needs to be configured a little bit:

```
notepad C:\ProgramData\ssh\sshd_config
```

Make sure that this line is in the file (without `#` at the beginning):

```
AllowTcpForwarding yes
AllowStreamLocalForwarding yes
```

## Access SSH host via internet

The most convenient way for remote control a computer over internet may be [TeamViewer – The Remote Connectivity Software](https://www.teamviewer.com/apac/). However, it suffers from latency and require good network condition. For development purpose, `ssh` remote control is more suitable and, with VS Code's `ssh` extension, you just have almost the same experience with developing on local machine.

To expose `ssh` server to the internet, configuration of the router is needed. The following blog post by [chrisjrob](https://chrisjrob.com) provides detail description:

> [Dynamic Dns and Remote ssh and VNC - chrisjrob](https://chrisjrob.com/2011/04/05/dynamic-dns-and-remote-ssh-and-vnc/)

However, for some cases, the router is out of control. For example, your host machine is connected to your school's network. In this case, [NAT traversal - Wikipedia](https://en.wikipedia.org/wiki/NAT_traversal) is what you need. Here we take [cpolar](https://www.cpolar.com) as an example - it provides internet server for free and requires very less configuration. If you prefer to use your own internet server, you can try [frp](https://github.com/fatedier/frp).

### Sign up and install

Sign up an account and install `cpolar` following its instruction:

> [文档 - cpolar 极点云](https://www.cpolar.com/docs?channel=0&invite=4VfC)

In terminal, setup token:

```
cpolar authtoken <your privite token>
```

### Launch TCP tunnel

Launch TCP tunnel at port `22`:

```
cpolar tcp 22
```

Then check the status panel in your `cpolar` account webpage. You can find the a tcp tunnel has been setup along with a URL. The URL has two part: domain and port. Try to access it via `ssh`:

```
ssh <user name>@<domain> -p <port>
```

### Configure background service

The TCP tunnel setup via [[#Launch TCP tunnel]] will be expired when the terminal is closed. To set the tunnel to be a background service and automatically launch with reboots, we need to edit `cpolar`'s configuration file.

> [4.2 默认配置文件路径 - cpolar 极点云](https://www.cpolar.com/docs?channel=0&invite=4VfC#configuration-file)

> [3.3 将隧道配置为后台服务 - cpolar 极点云](https://www.cpolar.com/docs?channel=0&invite=4VfC#configure-as-background-service)

Open the configuration file:

```
notepad ~\.cpolar\cpolar.yml
```

Edit the configuration. For example:

```
tunnels:
  ssh:
    addr: 22
    proto: tcp
    region: hk
```

_P.S. There are various region options: us,hk,cn,cn_vip._

And then restart `cpolar`. The tunnel will be automatically setup:

```
Restart-Service cpolar
```