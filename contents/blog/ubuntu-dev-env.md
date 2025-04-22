---
title: Deep learning environment setup
tags:
  - Hinton/CS
date: "2025-04-22"
update: 
link:
---

# Deep learning environment setup

## Install Ubuntu

> [Install Ubuntu Desktop | Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview)
> [Ubuntu Releases](https://releases.ubuntu.com/)

For fast installation, I didn't connect to the Internet and didn't download any upgrade. However, full-upgrade of kernel/packages must be done after the installation. Otherwise, newly added packages could clash.

```bash
sudo apt update
sudo apt full-upgrade --yes
sudo apt autoremove --yes
sudo apt autoclean --yes
reboot
```

## Fish shell

### Install

> [How to Install and Set Up the Fish Shell | by Saad Jamil | Medium](https://medium.com/@saadjamilakhtar/how-to-install-and-set-up-the-fish-shell-b9e0ddb12cc9)

```bash
sudo apt-add-repository ppa:fish-shell/release-3
sudo apt-get update
sudo apt-get install fish
```

### Theme

> [GitHub - oh-my-fish/theme-bobthefish: A Powerline-style, Git-aware fish theme optimized for awesome.](https://github.com/oh-my-fish/theme-bobthefish)

Use `oh-my-fish` to manage `fish` themes. Here we choose `bobthefish`:

```bash
curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
omf install bobthefish
omf theme bobthefish
```

Configure `fish` by append the following contents to `~/.config/fish/config.fish`:

```bash
set -g default_user na
set -g theme_display_hostname no
set -g fish_prompt_pwd_dir_length 0
set -g theme_display_git_default_branch yes
set -g theme_display_virtualenv no
set -g theme_display_date yes
set -g theme_date_format "+%a %H:%M"
set -g theme_newline_cursor yes
set -g theme_newline_prompt '> '
```

### Enter `fish` automatically in Bash shell

Add this line to the end of `~/.bashrc`:

```bash
# auto launch fish shell
fish
```

_P.S. `~/.bashrc` will be executed whenever a new `bash` shell is launched. Please note that all commands after this line will only be executed after you `exit` the `fish` shell. Therefore make sure that this line is at the end of `~/.bashrc`._

### Powerline font

To show `bobthefish` theme properly, we need to install [Powerline fonts](https://github.com/powerline/fonts). I personally prefer [Liberation Mono for Powerline](https://github.com/powerline/fonts/blob/master/LiberationMono/Literation%20Mono%20Powerline.ttf), which is the default monospace font used in VS Code with Powerline style special symbols. For Ubuntu's default terminal: right click the terminal icon > Preference > Unnamed > Custom font.

## VS Code

> [Fetching Title#ed0b](https://code.visualstudio.com/docs/setup/linux#_install-vs-code-on-linux)

Download VS Code's Linux version and then:

```bash
sudo apt install <file>.deb
```

## Git

```bash
sudo apt-get install git
```

### Configuration

Let's configure its default user name and user email. Noted that when you push commit to GitHub, the email will be used to identify your GitHub account:

```bash
git config --global user.name <name>
git config --global user.email <email>
git config --global init.defaultBranch main
```

### SSH key for GitHub

To authorize your operation on GitHub, you will also need to generate a ssh key:

```bash
ssh-keygen -t rsa -C "<email>"
```

And then you need to add it to your account: Settings > SSH and GPG keys > Add SSH Key. Fill the _title_ as you like and paste the _key_ with the content of the generated `id_rsa.pub` (NOT `id_rsa`!!). The content of `id_rsa.pub` can be easily accessed from command line:

```
cat ~/.ssh/id_rsa.pub
```

## Docker

> [Install using the apt repository \| Docker Docs](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
# P.S. Bash shell needed.
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

> [Install Docker Desktop on Ubuntu \| Docker Docs](https://docs.docker.com/desktop/setup/install/linux/ubuntu/)

Download the latest release and then:

```bash
sudo apt-get install ./docker-desktop-amd64.deb
```

> [Sign in \| Docker Docs](https://docs.docker.com/desktop/setup/sign-in/#signing-in-with-docker-desktop-for-linux)

Create `gpg` key and the initialize `pass`:

```bash
gpg --generate-key
pass init <your_generated_gpg-id_public_key>
```

And then launch Docker Desktop to sign in.

## Python & Conda

> [Installing Miniconda](https://educe-ubc.github.io/conda.html)

```bash
curl -sL "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh" > "Miniconda3.sh"
bash Miniconda3.sh
```

_P.S. If you enter `fish` shell from `bash` shell, the previous commands only automatically initialize `conda` for `bash` shell. To initialize `conda` for `fish` shell as well, run the following command in `bash` shell:_

```bash
conda init
```

## Nvidia driver & CUDA & PyTorch

### Driver 550

Install the newest Nvidia driver compatible with your GPU. You don't need to worry about its compatibility with CUDA, since the driver is designed to be backward-compatible:

> [Download The Official NVIDIA Drivers \| NVIDIA](https://www.nvidia.com/en-us/drivers/)

```bash
sudo apt install nvidia-driver-550
reboot
```

Verify:

```bash
lsmod | grep nvidia
nvidia-smi
```

_P.S. If you have multiple GPUs installed, you can test their connection via:_

```bash
nvidia-smi topo -m
```

### PyTorch 2.6.0

> [Start Locally \| PyTorch](https://pytorch.org/get-started/locally/)

```bash
conda create -n pytorch python=3.10
conda activate pytorch
pip3 install torch torchvision torchaudio
```

It will also install the bundled CUDA for you, thus you don't have to install CUDA yourself. However, commands like `nvcc` would not be available. To verify installation:

```bash
python
>>> import torch
>>> device = 'cuda' if torch.cuda.is_available() else 'cpu'
>>> torch.rand(5, 3).to(device)
```

### CUDA 12.4

_P.S. If you just want to use PyTorch with CUDA, as specified before, you don't need to install CUDA yourself. However, if you want to compile PyTorch yourself or write customized CUDA codeto boost performance, you will need to install the CUDA Toolkit yourself. If it's the case, follow steps below:_

> [CUDA Toolkit 12.4 Downloads \| NVIDIA Developer](https://developer.nvidia.com/cuda-12-4-0-download-archive?target_os=Linux&target_arch=x86_64&Distribution=Ubuntu&target_version=22.04&target_type=deb_local)

```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-ubuntu2204.pin
sudo mv cuda-ubuntu2204.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/12.4.0/local_installers/cuda-repo-ubuntu2204-12-4-local_12.4.0-550.54.14-1_amd64.deb
sudo dpkg -i cuda-repo-ubuntu2204-12-4-local_12.4.0-550.54.14-1_amd64.deb
sudo cp /var/cuda-repo-ubuntu2204-12-4-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda-toolkit-12-4
```

Add the following lines to `~/.bashrc`:

```bash
# cuda path
export PATH="/usr/local/cuda-11.8/bin:$PATH"
export LD_LIBRARY_PATH="/usr/local/cuda-11.8/lib64:$LD_LIBRARY_PATH"
```

Verify:

```bash
nvcc -V
```

## SSH

```bash
sudo apt-get install openssh-server
```

### Configuration

```bash
code /etc/ssh/sshd_config
```

You could change the port number, say `2222`:

```bash
Port 2222
```

You may also want to enable the password login:

```bash
PasswordAuthentication yes
```

After altering the configuration, restart `ssh` server:

```
sudo systemctl restart ssh
```

### SSH connect

```bash
sudo apt install net-tools
ifconfig
```

Find the IP address. Then on other device connected to the same network, you can SSH into the Ubuntu machine:

```bash
ssh <user>@<address>
```

_P.S. If you've changed the port number:_

```bash
ssh <user>@<address> -p <port>
```

### Key authentication

> [How To Configure SSH Key-Based Authentication on a Linux Server | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)

Having to enter password for each `ssh` login  is not very convenient. We can make our life a little bit easier by setting up key authentication.

#### On the client machine

First generate a key:

```
ssh-keygen
```

It will prompt you to input the `<key path>` and the pass phrase. Then you need to add your key to your local `ssh` client:

```
ssh-add <key path>
```

Noted that you will need to add it again when you reboot your local machine. You may add this command to `~/.bashrc` (or `~/.zshrc` if you use macOS) for convenience.

Then send the key to the remote server:

```
ssh-copy-id -i <key path> -p <port> <address>
```

Noted the the `-p` argument is the port number of the remote server you set before. Moreover, the `address` is the IP address of the remote server which can be check by `ifconfig`.

#### On the host machine

Before you can log in to the remote server without entering the password, you will need to enable key authentication first:

```
code /etc/ssh/sshd_config
```

And then change uncomment the row of `PubKeyAuthentication yes`. For security considerations, it's preferable to disable password authentication if you have already setup key authentication. Change the row of `PasswordAuthentication yes` to `PasswordAuthentication no`.

And then:

```
sudo systemctl restart sshd
```

If everything is setup well, you will no longer need to enter the password the next time you `ssh` into the remote machine.

### NAT traversal with `ngrok`

To access the ssh host from the internet, we need to expose it to the internet. One simple and free way is using `ngrok`:

#### Installation

> [Setup & Installation | ngrok](https://dashboard.ngrok.com/get-started/setup/linux)

Sign up a `ngrok` account and install it following the guide on this link.

#### Configuration

> [Configuration File \| ngrok documentation](https://ngrok.com/docs/agent/config/)
> [Version 3 \| ngrok documentation](https://ngrok.com/docs/agent/config/v3/)

Add `ssh` tunnel setting in `~/.config/ngrok/ngrok.yml`:

```yml
tunnels:
  ssh:
    proto: tcp
    addr: 22
```

#### Setup system service

> [Running ngrok in the background | ngrok documentation](https://ngrok.com/docs/agent/#background-service)

```bash
ngrok service install --config ~/.config/ngrok/ngrok.yml
ngrok service start
```

### `tmux`

When using `ssh` for remote development, all running process will be terminated once you disconnect from the host. This is frustrating when you have something that could take hours or days to complete (e.g. training neural network) or your network is not stable. In that case, you need `tmux`.

#### Install & configuration

```bash
sudo apt update sudo apt install tmux
```

Enable mouse in `tmux`:

```bash
touch ~/.tmux.conf
echo "set -g mouse on" >> ~/.tmux.conf
```

#### Start session

First start a `tmux` session:

```bash
tmux
```

Or start with a custom name:

```bash
tmux new -s mysession
```

It will launch a terminal like the ordinary one. When you disconnect to the host, the process running in that terminal will continue to run. To view the status of all running sessions:

```bash
tmux ls
```

#### Reconnect to a session

When you reconnect to the host, you can enter that `tmux` session by:

```bash
tmux attach
```

#### Enter a specific session

```bash
tmux attach -t <name>
```

### Kill a specific session

```bash
tmux kill-session -t <name>
```

## Appendix

### Proxy

> [glados.one](https://glados.one/console/clash)

```bash
wget https://glados.one/tools/clash-verge_1.3.8_amd64.deb
sudo apt install ./clash-verge_1.3.8_amd64.deb
```

- Open Clash Verge from application list and setup proxy
- Turn on `System Proxy` and `Auto Launch`

#### Use terminal with proxy

Add these line to `~/.bashrc`:

```bash
# proxy setting
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
```

#### Use `apt` with proxy

Add this line to `/etc/apt/apt.conf`:

> [Configure proxy for APT? - Ask Ubuntu](https://askubuntu.com/questions/257290/configure-proxy-for-apt)

```bash
Acquire::http::Proxy "http://<address>:<port>";
```

#### Use `git` with proxy

> [Configure Git to use a proxy · GitHub](https://gist.github.com/evantoli/f8c23a37eb3558ab8765)

```bash
git config --global http.proxy http://<address>:<port>
```

#### Use `docker` with proxy

> [Change settings \| Docker Docs](https://docs.docker.com/desktop/settings-and-maintenance/settings/#proxies)

Docker Desktop > Setting > Resource > Proxies > Enable Manual > Fill in HTTP & HTTPS proxies

### Performance benchmarking

#### CPU

> [cpuburn](https://patrickmn.com/projects/cpuburn/)

Download and run:

```bash
./cpuburn
```

_P.S. Monitor GPU frequency:_

```bash
watch "cat /proc/cpuinfo | grep 'MHz'"
```

For a more visual monitoring of the system's resources including CPU, RAM, disk, & network usage:

> [GitHub - aristocratos/btop: A monitor of resources](https://github.com/aristocratos/btop)

```bash
sudo apt install btop
```

#### GPU

> [GitHub - wilicc/gpu-burn: Multi-GPU CUDA stress test](https://github.com/wilicc/gpu-burn)

```bash
git clone git@github.com:wilicc/gpu-burn.git
cd gpu-burn
make
```

General test:

```bash
./gpu_burn 3600
```

Tensor core test:

```bash
./gpu_burn -tc 3600
```

_P.S. Monitor GPU status:_

```bash
watch -n 1 nvidia-smi
```

Or for a more visual monitoring:

> [GitHub - Syllo/nvtop: GPU & Accelerator process monitoring for AMD, Apple, Huawei, Intel, NVIDIA and Qualcomm](https://github.com/Syllo/nvtop)

```bash
sudo add-apt-repository ppa:flexiondotorg/nvtop
sudo apt install nvtop
```

> [GitHub - Syllo/nvtop: GPU & Accelerator process monitoring for AMD, Apple, Huawei, Intel, NVIDIA and Qualcomm](https://github.com/Syllo/nvtop)
> [安静、高性价比双卡装机【100亿模型计划】](https://youtu.be/kzSI_7K3_so?si=G9KlyrsTBua1BVAn)
