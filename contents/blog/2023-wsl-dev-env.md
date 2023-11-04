---
title: "A complete guide to setup WSL (Windows Subsystem for Linux)"
date: "2023-11-02"
update: "2023-11-04"
link:
    medium: "https://medium.com/@tob-knpob/a-complete-guide-to-setup-wsl-windows-subsystem-for-linux-4547e88b6cdb"
---

 WSL (Windows Subsystem for Linux) has various great advantages against dual reboots (installing Linux and Windows on the same computer), among them the most significant is that you can literally running both systems at the same time without the need to stop every software that's running and reboot to another system. Procedure to set up a WSL is roughly the same as setting up a real Linux OS, therefore this guide can also be used as a reference to Linux setup. The specifications of WSL setup procedure is mainly in _Install WSL_, _CUDA and PyTorch_ and _Remote development with SSH_ as described below.

## Install WSL

> [Install WSL | Microsoft Learn](https://learn.microsoft.com/en-us/windows/wsl/install)

In PowerShell, run:

```
wsl --install
```

After restart the computer, the terminal will prompt you to set the user name and password for the WSL. Then you can then enter the linux subsystem by enter `wsl` in PowerShell or create a `Ubuntu (WSL)` shell in the terminal app.

_P.S. Ubuntu is installed by default. You can also choose other distributions._

## Fish shell

![img](/img/20231104-fish%20shell.png)

### Install

> [How to Install and Set Up the Fish Shell | by Saad Jamil | Medium](https://medium.com/@saadjamilakhtar/how-to-install-and-set-up-the-fish-shell-b9e0ddb12cc9)

```
sudo apt-add-repository ppa:fish-shell/release-3
sudo apt-get update
sudo apt-get install fish
```

### Theme

> [GitHub - oh-my-fish/theme-bobthefish: A Powerline-style, Git-aware fish theme optimized for awesome.](https://github.com/oh-my-fish/theme-bobthefish)

Use `oh-my-fish` to manage `fish` themes. Here we choose `bobthefish`:

```
curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
omf install bobthefish
omf theme bobthefish
```

Configure `fish` by append the following contents to `~/.config/fish/config.fish`:

```
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

```
# auto launch fish shell
fish
```

_P.S. `~/.bashrc` will be executed whenever a new `bash` shell is launched. Please note that all commands after this line will only be executed after you `exit` the `fish` shell. Therefore make sure that this line is at the end of `~/.bashrc`._

### Powerline font

To show `bobthefish` theme properly, we need to install [Powerline fonts](https://github.com/powerline/fonts). I personally prefer `Liberation Mono for Powerline`, which is the default monospace font used in VS Code with Powerline style special symbols. In every places you'd like to use to terminal, e.g. VS Code's integrated terminal, set the font accordingly.

## Git

### Configuration

`git` is pre-installed in WSL as well as most UNIC-like OSs. Let's configure its default user name and user email. Noted that when you push commit to GitHub, the email will be used to identify your GitHub account:

```
git config --global user.name <name>
git config --global user.email <email>
```

### SSH key for GitHub

To authorize your operation on GitHub, you will also need to generate a ssh key:

```
ssh-keygen -t rsa -C "<email>"
```

And then you need to add it to your account: Settings > SSH and GPG keys > Add SSH Key. Fill the _title_ as you like and paste the _key_ with the content of the generated `id_rsa.pub` (NOT `id_rsa`!!). The content of `id_rsa.pub` can be easily accessed from command line:

```
cat ~/.ssh/id_rsa.pub
```

## Python and Conda

> [Installing Miniconda](https://educe-ubc.github.io/conda.html)

```
curl -sL "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh" > "Miniconda3.sh"
bash Miniconda3.sh
```

_P.S. If you enter `fish` shell from `bash` shell, the previous commands only automatically initialize `conda` for `bash` shell. To initialize `conda` for `fish` shell as well, run the following command in `bash` shell:_

```
conda init fish
```

## CUDA and PyTorch

### CUDA

If the GPU driver and CUDA has been setup on Windows, they will also be available on WSL. Following the steps to install CUDA on WSL:

> [1. NVIDIA GPU Accelerated Computing on WSL 2 — CUDA on WSL 12.3 documentation](https://docs.nvidia.com/cuda/wsl-user-guide/index.html#getting-started-with-cuda-on-wsl)

> [CUDA Toolkit 11.8 Downloads | NVIDIA Developer](https://developer.nvidia.com/cuda-11-8-0-download-archive?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_local)

```
wget https://developer.download.nvidia.com/compute/cuda/repos/wsl-ubuntu/x86_64/cuda-wsl-ubuntu.pin
sudo mv cuda-wsl-ubuntu.pin /etc/apt/preferences.d/cuda-repository-pin-600
wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda-repo-wsl-ubuntu-11-8-local_11.8.0-1_amd64.deb
sudo dpkg -i cuda-repo-wsl-ubuntu-11-8-local_11.8.0-1_amd64.deb
sudo cp /var/cuda-repo-wsl-ubuntu-11-8-local/cuda-*-keyring.gpg /usr/share/keyrings/
sudo apt-get update
sudo apt-get -y install cuda
```

> [16.04 - nvcc --version command says nvcc is not installed - Ask Ubuntu](https://askubuntu.com/questions/885610/nvcc-version-command-says-nvcc-is-not-installed)

Add `cuda` to path. Add the the following lines to `~/.bashrc`:

```
export PATH="/usr/local/cuda-11.8/bin:$PATH"
export LD_LIBRARY_PATH="/usr/local/cuda-11.8/lib64:$LD_LIBRARY_PATH"
```

_P.S. Again, please make sure that the line of `fish` is at the end of `.bashrc`._

Verification:

```
nvcc -V
```

### Create a virtual environment and install PyTorch

```
conda create -n pytorch python=3.10
conda activate pytorch
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```

Verify installation:

```
python
>>> import torch
>>> print(torch.rand(5, 3))
>>> torch.cuda.is_available()
```

## Node.js and NVM

> [Installation of Node.js on Linux - GeeksforGeeks](https://www.geeksforgeeks.org/installation-of-node-js-on-linux/)

```
sudo apt install node
sudo apt install npm
```

Verify installation:

```
node -v
npm -v
```

## Remote development with SSH

### SSH server

> [ubuntu - ssh installed but I get the error: Failed to start ssh.service: Unit ssh.service not found - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/520341/ssh-installed-but-i-get-the-error-failed-to-start-ssh-service-unit-ssh-service)

Though the SSH client is installed by default, the SSH server is needed to be explicitly installed to enable other computers to remotely access your WSL:

```
sudo apt-get install openssh-server
```

### Port number

> [bash - How to SSH into WSL from Windows on the same machine - Super User](https://superuser.com/questions/1123552/how-to-ssh-into-wsl-from-windows-on-the-same-machine)

Since the Windows system may have occupied port 22 for SSH, we need to specify another port for the WSL's SSH:

```
sudo nano /etc/ssh/sshd_config
```

And then change the port number, say `2222`.

```
Port 2222
```

Restart `ssh` server:

```
sudo systemctl restart ssh
```

### NAT traversal with `cpolar`

> [cpolar下载与安装 - cpolar 极点云](https://www.cpolar.com/blog/cpolar-download-and-install)

```
curl -L https://www.cpolar.com/static/downloads/install-release-cpolar.sh | sudo bash
```

In terminal, setup token:

_P.S. Your token is linked to your `cpolar` account._

```
cpolar authtoken <your privite token>
```

To set the tunnel to be a background service and automatically launch with reboots, we need to edit `cpolar`'s configuration file.

> [4.2 默认配置文件路径 - cpolar 极点云](https://www.cpolar.com/docs?channel=0&invite=4VfC#configuration-file)

> [3.3 将隧道配置为后台服务 - cpolar 极点云](https://www.cpolar.com/docs?channel=0&invite=4VfC#configure-as-background-service)

Open the configuration file:

```
sudo nano /usr/local/etc/cpolar/cpolar.yml
```

Edit the configuration. For example:

```
tunnels:
  ssh:
    addr: 2222
    proto: tcp
    region: hk
```

_P.S. The `addr` should be the port number you set in `/etc/ssh/sshd_config`._

_P.S. There are various `region` options: us,hk,cn,cn_vip._

And then restart `cpolar`. The tunnel will be automatically setup:

```
sudo systemctl restart cpolar
```
