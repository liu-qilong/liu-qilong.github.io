---
title: "A complete guide to setup WSL (Windows Subsystem for Linux)"
date: "2023-11-02"
update: "2023-12-06"
link:
    medium: "https://medium.com/@liu-qilong/a-complete-guide-to-setup-wsl-windows-subsystem-for-linux-4547e88b6cdb"
---

 WSL (Windows Subsystem for Linux) has various great advantages against dual-boot (installing Linux and Windows on the same computer), among them the most significant is that you can literally running both systems at the same time without the need to stop every software that's running and reboot to another system. Procedure to set up a WSL is roughly the same as setting up a real Linux OS, therefore this guide can also be used as a reference to Linux setup. The specifications of WSL setup procedure are mainly in _Install WSL_, _CUDA and PyTorch_, _VTK with PyVista, and _Remote development with SSH_ as described below.

## Install WSL

> [Install WSL | Microsoft Learn](https://learn.microsoft.com/en-us/windows/wsl/install)

In PowerShell, run:

```
wsl --install
```

After restart the computer, the terminal will prompt you to set the user name and password for the WSL. Then you can then enter the linux subsystem by enter `wsl` in PowerShell or create a `Ubuntu (WSL)` shell in the terminal app.

_P.S. Ubuntu is installed by default. You can also choose other distributions. In my case I choose Ubuntu 18.04 for VTK with PyVista:_

```
wsl --install -d Ubuntu-18.04
```

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

To show `bobthefish` theme properly, we need to install [Powerline fonts](https://github.com/powerline/fonts). I personally prefer [Liberation Mono for Powerline](https://github.com/powerline/fonts/blob/master/LiberationMono/Literation%20Mono%20Powerline.ttf), which is the default monospace font used in VS Code with Powerline style special symbols. In every places you'd like to use to terminal, e.g. VS Code's integrated terminal, set the font accordingly.

Take Windows Terminal app as an example: Settings > Profiles > Defaults > Appearance > Text > Font face. By the way I also prefer to set the color scheme as One Half Dark and set the background opacity as 80% with acrylic material enabled.

## Git

`git` is pre-installed in WSL as well as most UNIX-like OSs, but it may be a legacy version. I prefer to update it first:

```
sudo add-apt-repository ppa:git-core/ppa
sudo apt-get update
sudo apt-get upgrade git
```

> [18.04 - sudo add-apt-repository hangs - Ask Ubuntu](https://askubuntu.com/questions/1123177/sudo-add-apt-repository-hangs)

_P.S. If the first command hangs, `sudo nano /etc/gai.conf` and uncomment the row of `precedence ::ffff:0:0/96  100`._

### Configuration

Let's configure its default user name and user email. Noted that when you push commit to GitHub, the email will be used to identify your GitHub account:

```
git config --global user.name <name>
git config --global user.email <email>
git config --global init.defaultBranch main
```

### Ignore Jupyter Notebook outputs

> [How to commit jupyter notebooks without output to git while keeping the notebooks outputs intact locally · GitHub](https://gist.github.com/33eyes/431e3d432f73371509d176d0dfb95b6e)

If you use Jupyter Notebook with Git, perhaps you'd be happy to keep the outputs of the code cells to be omitted for version tracking. In this case, first add a filter named `strip-notebook-output` globally to `git`:

```
git config --global filter.strip-notebook-output.clean 'jupyter nbconvert --ClearOutputPreprocessor.enabled=True --to=notebook --stdin --stdout --log-level=ERROR'
```

And then in each folder with Jupyter Notebook, run this to create a `.gitattributes` file to enable this filter on all Jupyter Notebooks:

```
echo "*.ipynb filter=strip-notebook-output" > .gitattributes
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

_P.S. At this stage, you may need to check `~/.bashrc` and make sure the line of `fish` is at the end._

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
# cuda path
export PATH="/usr/local/cuda-11.8/bin:$PATH"
export LD_LIBRARY_PATH="/usr/local/cuda-11.8/lib64:$LD_LIBRARY_PATH"
```

_P.S. Again, please make sure that the line of `fish` is at the end of `.bashrc`._

Verification:

```
nvcc -V
nvidia-smi
```

_P.S. The `nvidia-smi` command seems works properly on Ubuntu 18.04 WSL but not on Ubuntu 22.04 WSL._

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
>>> torch.rand(5, 3)
>>> torch.cuda.is_available()
```

## VTK with PyVista

In my use case,  VTK (visualization toolkit) and `pyvista` (a 3D visualization package) is frequently used. However, since WSL doesn't carries GUI by default, setting up `pyvista` is a little bit tricky. If you don't use `pyvista`, please feel free to skip this section.

> [Installation — PyVista 0.42.3 documentation](https://docs.pyvista.org/version/stable/getting-started/installation.html#running-on-ci-services)

Install necessary utils:

```
sudo apt update
sudo apt install python-qt4 libgl1-mesa-glx
sudo apt-get install xvfb
```

_P.S. Since Ubuntu 22.04 no longer supports Qt4, you'd better choose Ubuntu 18.04 if you need this package._

Create a virtual environment for it and installed the necessary packages:

```
conda create --name vtk_env python=3.9
conda activate vtk_env
conda install nodejs
pip install jupyter pyvista trame
```

### With JupyterLab

Before starting using PyVista, in terminal:

```
export DISPLAY=:99.0
export PYVISTA_OFF_SCREEN=true
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
sleep 3
```

This will launch a [X11 server](https://en.wikipedia.org/wiki/X_Window_System) for displaying the rendered scene as well as setup some necessary environmental variables. Then we can launch the Jupyter Lab server as usual:

```
jupyter lab --NotebookApp.token='' --no-browser --port=8888
```

_P.S. If you connect to the WSL wish `ssh`, `jupyter-server-proxy` is needed to be setup:_

> [Trame Jupyter Backend for PyVista — PyVista 0.42.3 documentation](https://docs.pyvista.org/version/stable/user-guide/jupyter/trame.html)

```
!pip install jupyter-server-proxy

import pyvista as pv

pv.set_jupyter_backend('client')
pv.global_theme.trame.server_proxy_enabled = True
pv.global_theme.trame.server_proxy_prefix = '/proxy/'
```

### With VS Code

In terminal, launch the X11 server for displaying the rendered scenes:

```
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

And at the begging of each Notebook, setup the necessary environmental variables:

```
import os
import pyvista as pv

pv.set_jupyter_backend('static')
os.environ['DISPLAY'] = ':99.0'
os.environ['PYVISTA_OFF_SCREEM'] = 'true'
```

_P.S. I haven't yet figure out how to enable iterative plotting in VS Code environment. Therefore, I select the `static` backend._

## Node.js and NVM

> [Installation of Node.js on Linux - GeeksforGeeks](https://www.geeksforgeeks.org/installation-of-node-js-on-linux/)

```
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
sudo dpkg-reconfigure openssh-server
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

You may also want to enable the password login:

```
PasswordAuthentication yes
```

After altering the configuration, restart `ssh` server:

```
sudo systemctl restart ssh
```

### Key authentication

> [How To Configure SSH Key-Based Authentication on a Linux Server | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)

Having to enter password for each `ssh` login  is not very convenient. We can make our life a little bit easier by setting up key authentication. First generate a key:

```
ssh-keygen
```

It will prompt you to input the `<key path>` and the pass phrase. Then you need to add your key to your local `ssh` client:

```
ssh-add <key path>
```

Noted that you will need to add it again when you reboot your local machine. You may add this command to `~/.bashrc` for convenience.

Then send the key to the remote server:

```
ssh-copy-id -i <key path> -p 2222 <address>
```

Noted the the `-p` argument is the port number of the remote server you set before. Moreover, the `addr` is the IP address of the remote server which can be check by `ifconfig`.

Before you can log in to the remote server without entering the password, you will need to enable key authentication first:

```
sudo nano /etc/ssh/sshd_config
```

And then change uncomment the row of `KeyAuthentication yes`. For security considerations, it's preferable to disable password authentication if you have already setup key authentication. Change the row of `PasswordAuthentication yes` to `PasswordAuthentication no`.

And then:

```
sudo systemctl restart sshd
```

If everything is setup well, you will no longer need to enter the password the next time you `ssh` into the remote machine.

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

### Port forward

NAT traversal exposes your WSL via an external server. It's very convenient but the speed will be limited - especially when transferring large files. In the scenario that your host and your local machine is under the same network, say using your laptop to access the WSL running on your lab's workstation or server, you may want to access your WSL directly with its IP address:

```
ssh <user>@<ip> -p <port num>
```

Then you are in trouble: your Windows machine's IP address is different from the WSL running on it; and the IP address of the WSL can't be access from outside the Windows machine :o

> [How to SSH into WSL2 on Windows 10 from an external machine - Scott Hanselman's Blog](https://www.hanselman.com/blog/how-to-ssh-into-wsl2-on-windows-10-from-an-external-machine)

Port forwarding is gonna to save you out of this dilemma. In Windows Terminal (Admin), first expose a port of the Windows machine for `ssh` access.

```
netsh advfirewall firewall add rule name=”Open Port <port num> for WSL” dir=in action=allow protocol=TCP localport=<port num>
```

And then launch a port proxy to forward this port to the WSL internally:

```
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=<port num> connectaddress=<ip of wsl> connectport=<port num>
```

Noted that you can check the IP of your WSL via `ifconfig` command - _note that it may be changed whenever you reboot the WSL as well as the host Windows machine. If this happens, you need to add a new port proxy and remove the outdated one_ Some useful commands to manage all port proxy in you Windows machine:

- Show all port proxies:
```
netsh interface portproxy show v4tov4
```
-  Remove all port proxies
```
netsh int portproxy reset all
```

Another tings to be noticed is that we set the port proxy to listen to address `0.0.0.0`. You need to set the `ListenAddress` property in your WSL's `/etc/ssh/sshd_config` to this address accordingly.

Then, if you are all set, you should be able to `ssh` to your WSL from another computer:

```
ssh <user>@<ip of windows> -p <port num>
```

Noted here you are suppose to use the IP address of your Windows machine. It can be checked by `ipconfig` command. Be careful: there may be different IPv4 addresses being shown, including the virtual address of the WSL. Be careful to choose the appropriate one.

### `tmux`

When using `ssh` for remote development, all running process will be terminated once you disconnect from the host. This is frustrating when you have something that could take hours or days to complete (e.g. training neural network) or your network is not stable. In that case, you need `tmux`.

Enable mouse in `tmux`:

```
touch ~/.tmux.conf
echo "set -g mouse on" >> ~/.tmux.conf
```

First start a `tmux` session:

```
tmux
```

It will launch a terminal like the ordinary one. However, when you disconnect to the host, the process running in that terminal will continue to run. Then when you reconnect to the host, you can enter that `tmux` session by:

```
tmux attach
```

Sometimes you may start various `tmux` sessions by running `tmux` command for multiply times. To view the status of them all:

```
tmux ls
```

Enter a specific session:

```
tmux attach -t <name>
```

Kill a specific session:

```
tmux kill-session -t <name>
```