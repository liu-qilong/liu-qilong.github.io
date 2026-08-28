---
title: Deep learning environment setup
tags:
  - Hinton/CS
date: "2025-04-22"
update: "2025-10-29"
---

# Deep learning environment setup

## Install Ubuntu 22.04 LTS

> [Install Ubuntu Desktop | Ubuntu](https://ubuntu.com/tutorials/install-ubuntu-desktop#1-overview)
> [Ubuntu Releases](https://releases.ubuntu.com/)

Select the right version of Ubuntu is important. Softwares for deep learning like CUDA and NCCL provide specific compiles for different Ubuntu versions; not all Ubuntu versions are available. In 2025, Ubuntu 22.04 and Ubuntu 20.04 are the safe choices.

After install the OS, full-upgrade of kernel/packages must be done. Otherwise, newly added packages could clash.

```bash
sudo apt update
sudo apt full-upgrade --yes
sudo apt autoremove --yes
sudo apt autoclean --yes
reboot
```

## Zsh shell

### Install

```bash
sudo apt update && sudo apt install -y zsh
# set as default shell
chsh -s $(which zsh)
```

### Plugins

Install `Zinit` to add `zsh` with lightweight plugins:

```bash
bash -c "$(curl --fail --show-error --silent --location \
  https://raw.githubusercontent.com/zdharma-continuum/zinit/HEAD/scripts/install.sh)"
```

Add these settings to `~/.zshrc` after the `zinit` block:

```bash
# zinit plugins
zinit light zsh-users/zsh-autosuggestions  # fish-style inline suggestions
zinit light zdharma-continuum/fast-syntax-highlighting  # real-time syntax coloring
zinit light zsh-users/zsh-completions  # extra completions (conda, git, etc.)
zinit light zsh-users/zsh-history-substring-search  # history substring search
autoload -Uz compinit && compinit

setopt AUTO_CD  # type a dir name to cd into it
setopt EXTENDED_HISTORY  # save timestamp and duration of each command
setopt HIST_IGNORE_DUPS  # no duplicate history entries
setopt SHARE_HISTORY  # share history across terminals
HISTFILE=~/.zsh_history
HISTSIZE=20000
SAVEHIST=20000

bindkey "$terminfo[kcuu1]" history-substring-search-up
bindkey "$terminfo[kcud1]" history-substring-search-down
bindkey '^[[A'  history-substring-search-up
bindkey '^[[B'  history-substring-search-down
bindkey '^[OA'  history-substring-search-up
bindkey '^[OB'  history-substring-search-down

WORDCHARS=''  # treat / - _ . as word boundaries
HISTORY_SUBSTRING_SEARCH_FUZZY=1  # fuzzy match (looser)
HISTORY_SUBSTRING_SEARCH_ENSURE_UNIQUE=1  # only show unique matches
```

Set syntax highlighting theme:

```bash
fast-theme clean
```

### Theme

Install [Starship](https://starship.rs) to style your command prompt:

```bash
curl -sS https://starship.rs/install.sh | sh
```

Or as non-root user:

```bash
curl -sS https://starship.rs/install.sh | sh -s -- -b ~/.local/bin
```

Then add this at the very end of `~/.zshrc`:

```bash
eval "$(starship init zsh)"
```

To setup the theme, download [omerxx/starship/starship.toml](https://github.com/omerxx/dotfiles/blob/master/starship/starship.toml) and place it as `~/.config/starship.toml`:

```bash
wget -O ~/.config/starship.toml https://raw.githubusercontent.com/omerxx/dotfiles/6254d18721ca537d777ccf3972778b2cfba2602b/starship/starship.toml
```

You need to install a Nerd font for the command prompt to render properly, e.g. CaskaydiaCove Nerd Font ([download](https://github.com/ryanoasis/nerd-fonts/releases/download/v3.4.0/CascadiaCode.zip). Set it as the font used in terminal after installing it:

- Ubuntu's default terminal: right click the terminal icon > Preference > Unnamed > Custom font.
- VS Code's terminal: Setting > Search "terminal font" > Set as `CaskaydiaCove Nerd Font`.

### Keychain

```bash
sudo apt install keychain
```

Add this to `~/.zshrc`:

```bash
# keychain
eval "$(keychain --eval --quiet --agents ssh id_rsa)"
```

This will load your ssh keys into `ssh-agent` and cache the passphrase, so you don't have to enter it every time you `ssh` into another machine. This is also useful for `git` operations that require ssh authentication, e.g. pushing to your GitHub repository. You can add additional keys following `id_rsa`.

## Editor

### VS Code

> [Fetching Title#ed0b](https://code.visualstudio.com/docs/setup/linux#_install-vs-code-on-linux)

Download VS Code's Linux version and then:

```bash
sudo apt install <file>.deb
```

### Vim

```bash
sudo apt install vim
```

### Neovim

> [Home - Neovim](https://neovim.io)

```bash
curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz
sudo rm -rf /opt/nvim-linux-x86_64
sudo tar -C /opt -xzf nvim-linux-x86_64.tar.gz
```

Then add this to `~/.zshrc`:

```bash
export PATH="/opt/nvim-linux-x86_64/bin:$PATH"
alias vi='nvim'
alias vim='nvim'
```

Confirm that `nvim` points to `/opt/nvim-linux-x86_64/bin/nvim`:

```bash
which nvim
```

_P.S. The last 2 lines alias `vim` & `vi` to `nvim`._

Pull in [my Neovim setup](https://github.com/liu-qilong/lazy-vim-setup):

```bash
# required
mv ~/.config/nvim{,.bak}

# optional but recommended
mv ~/.local/share/nvim{,.bak}
mv ~/.local/state/nvim{,.bak}
mv ~/.cache/nvim{,.bak}

# clone the starter
git clone https://github.com/liu-qilong/lazy-vim-setup.git ~/.config/nvim
```

#### Other dependencies

Make sure to setup [[#NVM and Node.js]] properly. Some critical LSP depends on it

Also, setup [[#LazyGit]] first so that it can be used.

> [BurntSushi/ripgrep - GitHub](https://github.com/burntsushi/ripgrep)

```bash
curl -LO https://github.com/BurntSushi/ripgrep/releases/download/14.1.1/ripgrep_14.1.1-1_amd64.deb
sudo dpkg -i ripgrep_14.1.1-1_amd64.deb
```

You can trigger file search in the file explorer with `\`. But make sure `fd` is available:

```bash
sudo apt update
sudo apt install fd-find ripgrep
mkdir -p ~/.local/bin
ln -sf "$(command -v fdfind)" ~/.local/bin/fd
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

`keychain` only loads the ssh keys into `ssh-agent`, but it doesn't tell `git` to use ssh for authentication. To make `git` use ssh instead of https for GitHub remote repositories, run:

```bash
git config --global url."git@github.com:".insteadOf "https://github.com/"
```

### SSH key for GitHub

To authorize your operation on GitHub, you will also need to generate a ssh key:

```bash
ssh-keygen
```

Here we use the default key `~/.ssh/id_rsa` as an example. And then you need to add it to your account: Settings > SSH and GPG keys > Add SSH Key. Fill the _title_ as you like and paste the _key_ with the content of the generated `id_rsa.pub` (NOT `id_rsa`!!). The content of `id_rsa.pub` can be easily accessed from command line:

```
cat ~/.ssh/id_rsa.pub
```

### LazyGit

> [LazyGit](https://github.com/jesseduffield/lazygit)

To use `lazyvim`:

```bash
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep -Po '"tag_name": "v\K[^"]*')
curl -Lo lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
tar xf lazygit.tar.gz lazygit
sudo install lazygit /usr/local/bin/
rm -f lazygit lazygit.tar.gz
```

## Python & Conda & UV

> [Installing Miniconda](https://educe-ubc.github.io/conda.html)

```bash
curl -sL "https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh" > "Miniconda3.sh"
bash Miniconda3.sh
```

> [Installation \| uv](https://docs.astral.sh/uv/getting-started/installation/)

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
source ~/.zshrc
```

## Nvidia driver & PyTorch

### Driver 550

Install the newest Nvidia driver compatible with your GPU. You don't need to worry about its compatibility with CUDA, since the driver is designed to be backward-compatible:

> [Download The Official NVIDIA Drivers \| NVIDIA](https://www.nvidia.com/en-us/drivers/)
> [NVIDIA drivers installation - Ubuntu Server documentation](https://documentation.ubuntu.com/server/how-to/graphics/install-nvidia-drivers/index.html)

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

_P.S. If you just want to use PyTorch with CUDA, as specified before, you don't need to install CUDA yourself. However, if you want to compile PyTorch yourself or write customized CUDA codeto boost performance, you will need to install the CUDA Toolkit yourself._

_P.S. Run `nvidia-smi` to see the highest CUDA version your current driver supports._

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

Add this to `~/.zshrc`:

```bash
# cuda
export PATH=/usr/local/cuda-12.4/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda-12.4/lib64:$LD_LIBRARY_PATH
export CUDA_HOME=/usr/local/cuda-12.4
```

Launch a new terminal and verify:

```bash
nvcc --version
```

### NCCL 2.26.5

NCCL is for multi-nodes/GPUs operation. Select the appropriate version according to your CUDA version.

> [NVIDIA Collective Communications Library (NCCL) \| NVIDIA Developer](https://developer.nvidia.com/nccl)
> [Installation Guide | NVIDIA Deep Learning NCCL Documentation](https://docs.nvidia.com/deeplearning/nccl/install-guide/index.html)

```bash
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu2204/x86_64/cuda-keyring_1.1-1_all.deb
sudo dpkg -i cuda-keyring_1.1-1_all.deb
sudo apt-get update
sudo apt install libnccl2=2.26.5-1+cuda12.4 libnccl-dev=2.26.5-1+cuda12.4
```

Tests:

> [GitHub - NVIDIA/nccl-tests: NCCL Tests](https://github.com/NVIDIA/nccl-tests)

## Docker

### Docker Engine

> [Install Docker Engine on Ubuntu \| Docker Docs](https://docs.docker.com/engine/install/ubuntu/)

Uninstall all potentially conflicting packages:

```bash
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

_P.S. Run this in `bash` shell instead of `fish` shell._

> [Install using the apt repository \| Docker Docs](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)

Set up Docker's `apt` repository:

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

Install the Docker packages:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

```bash
sudo docker run hello-world
```

### Docker with CUDA

> [Installing the NVIDIA Container Toolkit | Nvidia](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)

Install the prerequisites:

```bash
sudo apt-get update && sudo apt-get install -y --no-install-recommends \
   curl \
   gnupg2
```

Configure the production repository:

```bash
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

Run with `bash` to install Nvidia container toolkit:

```bash
sudo apt-get update
export NVIDIA_CONTAINER_TOOLKIT_VERSION=1.18.0-1
  sudo apt-get install -y \
      nvidia-container-toolkit=${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
      nvidia-container-toolkit-base=${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
      libnvidia-container-tools=${NVIDIA_CONTAINER_TOOLKIT_VERSION} \
      libnvidia-container1=${NVIDIA_CONTAINER_TOOLKIT_VERSION}
```

Configure docker and restart its daemon:

```bash
sudo nvidia-ctk runtime configure --runtime=docker
sudo nvidia-ctk runtime configure --runtime=docker
```

Verification:

```bash
sudo docker run --rm -it --gpus all pytorch/pytorch:2.0.0-cuda11.7-cudnn8-devel bash
```

_P.S. Nvidia provides a detailed tutorial on using Docker with CUDA: [Containers For Deep Learning Frameworks User Guide | Nvidia](https://docs.nvidia.com/deeplearning/frameworks/user-guide/index.html)_

### Docker Compose plugin

For running multi-container apps.

> [Install the Docker Compose plugin \| Docker Docs](https://docs.docker.com/compose/install/linux/)

```bash
sudo apt-get update
sudo apt-get install docker-compose-plugin
```

```bash
docker compose version
```

## NVM and Node.js

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.zshrc
nvm install --lts
nvm use --lts
```

## Rust

Install `cargo`, Rust’s official package manager and build tool:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
cargo install --locked tree-sitter-cli
```

## $\LaTeX$

The common practice is to install `texlive-full`. However, the installation got stuck while installing `context`, so I decided to install the minimal set of packages I need. You can add more packages later if needed.

```bash
sudo apt update
sudo apt install \
  latexmk \
  biber \
  chktex \
  latexdiff \
  texlive-base \
  texlive-binaries \
  texlive-latex-base \
  texlive-latex-recommended \
  texlive-latex-extra \
  texlive-fonts-recommended \
  texlive-fonts-extra \
  texlive-bibtex-extra \
  texlive-science \
  texlive-pictures \
  texlive-publishers \
  texlive-extra-utils \
  texlive-xetex \
  texlive-luatex
```

## `tmux`

Install `tmux`:

```bash
sudo apt-get install tmux
```

Install [tpm](https://github.com/tmux-plugins/tpm) as the plugin manager:

```bash
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm
```

Install prerequisites for some plugins:

```bash
sudo apt install fzf
sudo apt install bat
```

Create `~/.tmux.conf`:

```
set -g prefix ^A

set -g mouse on
set -g default-terminal "tmux-256color"
set -g base-index 1              # start indexing windows at 1 instead of 0
set -g detach-on-destroy off     # don't exit from tmux when closing a session
set -g escape-time 0             # zero-out escape time delay
set -g history-limit 1000000     # increase history size (from 2,000)
set -g renumber-windows on       # renumber all windows when any window is closed
set -g set-clipboard on          # use system clipboard
set -ag terminal-features ',xterm-256color:clipboard'
set -g status-position top       # macOS / darwin style

# vim mode
set-window-option -g mode-keys vi  # use vi keys in copy mode
bind -T copy-mode-vi v send -X begin-selection
bind -T copy-mode-vi V send -X select-line
bind -T copy-mode-vi y send -X copy-selection-and-cancel
bind -T copy-mode-vi Escape send -X cancel

# swap window order
bind -r < swap-window -d -t -1
bind -r > swap-window -d -t +1

# start a popup session with prefix + t
bind-key t if-shell \
  '[ "$(tmux display-message -p "#S")" = "popup" ]' \
  'detach-client' \
  'display-popup -d "#{pane_current_path}" -xC -yC -w 80% -h 80% -E "tmux attach -t popup || tmux new -s popup"'

# plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'

# persistent sessions
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @continuum-restore 'on'
set -g @continuum-save-interval '15'

# tmux-fzf
set -g @plugin 'sainnhe/tmux-fzf'
TMUX_FZF_SWITCH_CURRENT=1

bind w display-popup -E -w 85% -h 80% \
  "tmux list-windows -a -F '#{session_name}:#{window_index} [#{window_name}]' | \
  fzf --ansi \
      --preview 'tmux capture-pane -p -e -t \$(echo {} | cut -d\" \" -f1)' \
      --preview-window 'right:60%' \
      --bind 'enter:execute(tmux switch-client -t \$(echo {} | cut -d\" \" -f1))+abort' \
      --bind 'ctrl-x:execute(tmux kill-window -t \$(echo {} | cut -d\" \" -f1))+reload(tmux list-windows -a -F \"#{session_name}:#{window_index} [#{window_name}]\")'"

# theme
set -g @plugin 'catppuccin/tmux#v2.1.3'
set -g @catppuccin_flavor "mocha"
set -g @catppuccin_window_status_style "rounded"
set -g @catppuccin_directory_text " #{b:pane_current_path}"
set -g @catppuccin_date_time_text " %H:%M"
set -g @catppuccin_window_left_separator ""
set -g @catppuccin_window_right_separator " "
set -g @catppuccin_window_middle_separator " █"
set -g @catppuccin_window_number_position "right"
set -g @catppuccin_window_default_fill "number"
set -g @catppuccin_window_default_text "#W"
set -g @catppuccin_window_current_text "#W"
set -g @catppuccin_window_current_fill "number"
set -g @catppuccin_status_modules_right "directory" # date_time"
set -g @catppuccin_status_modules_left "session"
set -g @catppuccin_status_left_separator  " "
set -g @catppuccin_status_right_separator " "
set -g @catppuccin_status_right_separator_inverse "no"
set -g @catppuccin_status_fill "icon"
set -g @catppuccin_status_connect_separator "no"

set -g @catppuccin_session_color    "#{@thm_green}"    # left pill  → green
set -g @catppuccin_directory_color  "#{@thm_flamingo}" # right pill → pink
set -g @catppuccin_uptime_color     "#{@thm_sapphire}" # middle     → blue-teal
set -g @catppuccin_date_time_color  "#{@thm_blue}"     # clock      → blue

set -g status-left-length  100
set -g status-right-length 100
set -g  status-left  "#{E:@catppuccin_status_session}"
set -g  status-right "#{E:@catppuccin_status_directory}"  # directory
set -ag status-right "#{E:@catppuccin_status_uptime}"    # uptime
set -ag status-right "#{E:@catppuccin_status_date_time}"  # date_time

set -g @catppuccin_window_text "#W"

# initialize tmux plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'

# tmux style setup (place at the end to avoid o)
set -g status-style bg=default  # transparent status bar
set -gq popup-style 'bg=default'
set -gq popup-border-style 'bg=default,fg=colour240'

```

Then enter `tmux` and press `ctrl` + `A` and `shift` + `I` to install the plugins.

## Remote development

### SSH

```bash
sudo apt-get install openssh-server
```

#### Configuration

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

#### SSH connect

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

#### Key authentication

> [How To Configure SSH Key-Based Authentication on a Linux Server | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-configure-ssh-key-based-authentication-on-a-linux-server)

Having to enter password for each `ssh` login  is not very convenient. We can make our life a little bit easier by setting up key authentication.

**On the client machine**

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
ssh-copy-id -i <key path> -p <port> <user>@<address>
```

Noted the the `-p` argument is the port number of the remote server you set before. Moreover, the `address` is the IP address of the remote server which can be check by `ifconfig`.

**On the host machine**

Before you can log in to the remote server without entering the password, you will need to enable key authentication first:

```
code /etc/ssh/sshd_config
```

And then uncomment the row of `PubKeyAuthentication yes`. For security considerations, it's preferable to disable password authentication if you have already setup key authentication. Change the row of `PasswordAuthentication yes` to `PasswordAuthentication no`.

And then:

```
sudo systemctl restart sshd
```

If everything is setup well, you will no longer need to enter the password the next time you `ssh` into the remote machine.

### NAT traversal with Cloudflare

To access the ssh host from the internet, we need to expose it to the internet, i.e. NAT traversal. You can use Cloudflare to setup the tunnel, given that you own a domain. Even if you don't have a domain, buying one from Cloudflare is still cheaper than some NAT tools' paid subscriptions.

Follow this guide to set it up:

> [Connect to SSH with client-side cloudflared (legacy) · Cloudflare Zero Trust docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/use-cases/ssh/ssh-cloudflared-authentication/)

Key steps:

- Create a SSH tunnel in Cloudflare's Web dashboard: Cloudflare dashboard > Zero Trust > Networks > Tunnels > Create tunnel
  > [Create a tunnel (dashboard) · Cloudflare Zero Trust docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/get-started/create-remote-tunnel/)
  - Follow the guide in the _Overview tab_ to install and run a connector on your host machine
  - Create a public hostname in the _Public hostnames tab_
    - Subdomain & domain -> `<subdomain>.<domain>` the public domain to access the service, e.g. `ssh.example.com`
    - Service type & url -> `<type>://<url>` the url to the access the service on the remote machine, e.g. `ssh://localhost:22`
- Install `cloudflare` on you client machine.

#### Option 1: SSH to the domain name

Add this to `~/.ssh/config`:

```
Host ssh.example.com
ProxyCommand /usr/local/bin/cloudflared access ssh --hostname %h
```

Then you can:

```bash
ssh user@ssh.example.com
```

#### Option 2: SSH via reverse proxy

As you can see, `ProxyCommand` defines what happens when you launch `ssh` to a host. In this case, it runs `cloudflared access ssh --hostname %h` to setup the tunnel, i.e. one `cloudflare` process per connection. However, if your network is not stable (due to whatever reason, e.g. GFW), this could make your connection vulnerable. A better solution is:

```bash
cloudflared access ssh --hostname ssh.example.com --url localhost:<local-port>
```

Then you can:

```bash
ssh user@localhost -p <local-port>
```

#### Access internal (campus) resources via SOCKS5 proxy

Access of some online resources are restricted outside the campus. For example, the eStudent website is painstakingly slow--almost unusable. With SSH, you can easily turn your remote machine into a SOCKS5 proxy server; whatever accessible to the remote machine will then be accessible to you:

```bash
ssh user@<address> -p <port> -D <another-port>
```

Then setup SOCKS5 proxy in your OS/browser's proxy setting.

#### Expose web services to a domain name via Cloudflare

We might launch some web services on the remote machine, such as [TensorBoard](https://www.tensorflow.org/tensorboard) for monitoring the training progress:

```bash
tensorboard --logdir experiment/
```

This will launch a web page on `http://localhost:6006` by default. Using `tmux` (in the next section) or `nohup`, you can make it run in background like an persistent web service. If you want to access it from your local machine, one approach is with SSH's port forwarding:

```bash
ssh user@<address> -p <port> -L 6006:localhost:6006
```

However, this is a little bit inconvenient. Instead, you can use Cloudflare to expose it to a domain name:

- In the tunnel's setting, create a public hostname in the _Public hostnames tab_
  - Subdomain & domain -> `<subdomain>.<domain>` the public domain to access the service, e.g. `tb.example.com`
  - Service type & url -> `<type>://<url>` the url to the access the service on the remote machine, e.g. `http://localhost:6006`

Then the webpage will be accessible via Internet. However, this could raise privacy or security concerns. **You are strongly recommended to setup restrictions on who can access it.** For example, set it as **only you** can access:

- Cloudflare dashboard > Zero Trust > Settings > Authentication > Add new > GitHub. Follow the guidance to setup GitHub OAuth
- Cloudflare dashboard > Zero Trust > Access > Policies > Add a policy
  - Add rule: selector `Emails` value `your-github-email`, i.e. only you can access this service
- Cloudflare dashboard > Zero Trust > Access > Applications > Add an application
  - Fill in the application name, subdomain, and domain, the same as the ones you previously added in the tunnel settings
  - Policy: add the previously created policy, i.e. only you can access this service
  - Login method: select GitHub

Then when you open `http://<subdomain>.<domain>`, you will need to authenticate via GitHub. It will check whether your GitHub account's email matches the one you fill in the policy. If so, you will be directed to the webpage; otherwise, your access will be denied.

_P.S. The default authentication method is one-time-password via email. However, due to unknown reason, I couldn't receive any authentication email. You may explore other authentication methods as well._

### PyVista remote rendering

I use PyVista package quite a lot for 3D mesh rendering. When it's on the remote ssh host, things could get a little bit difficult. Here is a worked recipe:

> [Installation — PyVista 0.45.2 documentation](https://docs.pyvista.org/getting-started/installation#running-on-remote-servers)
> [python - PyVista plotting issue in Visual Studio Code using WSL 2 with Ubuntu 22.04.4 - Stack Overflow](https://stackoverflow.com/questions/78951451/pyvista-plotting-issue-in-visual-studio-code-using-wsl-2-with-ubuntu-22-04-4)

```bash
conda create --n vtk python=3.10
conda activate vtk
pip install pyvista[jupyter] ipykernel
```

_P.S. Specify specific versions for installation: (15 Feb 2026)_ ^2b7e9d

```bash
conda create --n vtk python=3.10
conda activate vtk
pip install jupyter-events==0.12.0 jupyter-server==2.17.0 jupyter-server-proxy==4.4.0 jupyter-server-terminals==0.5.3 jupyterlab-pygments==0.3.0 jupyterlab-widgets==3.0.16 trame==3.12.0 trame-client==3.11.2 trame-common==1.1.0 trame-server==3.9.0 trame-vtk==2.10.1 trame-vuetify==3.2.0
pip install pyvista[jupyter]==0.46.4
pip install ipykernel
```

Then in the `.ipynb` notebook on the remote machine:

- Online rendering

```python
import pyvista as pv
pv.set_jupyter_backend('html') # interactive
# pv.set_jupyter_backend('static') # static
pv.global_theme.transparent_background = True

render_configs = {
    'ambient': 0.1,          # base color visible even in shadow (0–1)
    'diffuse': 1.,          # main shading from light direction (0–1)
    'specular': 0.6,         # shininess / highlight intensity (0–1)
    'specular_power': 30,    # sharpness of specular highlight (0–128)
    'smooth_shading': True,
}

pl = pv.Plotter()
pl.add_mesh(
    mesh=pv.read('output/x.obj'),
    texture=pv.read_texture('output/texture.png'),
    **render_configs,
)
pl.show()
```

- Offscreen export rendered images:

```python
import pyvista as pv
pv.global_theme.transparent_background = True

render_configs = {
    'ambient': 0.1,          # base color visible even in shadow (0–1)
    'diffuse': 1.,          # main shading from light direction (0–1)
    'specular': 0.6,         # shininess / highlight intensity (0–1)
    'specular_power': 30,    # sharpness of specular highlight (0–128)
    'smooth_shading': True,
}

pl = pv.Plotter(off_screen=True)
pl.add_mesh(
    mesh=pv.read('output/x.obj'),
    texture=pv.read_texture('output/texture.png'),
    **render_configs,
)
pl.screenshot('output.png', window_size=[1024, 1024], return_img=False)
pl.close()
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

#### Python with proxy

When proxy is setup, you may need to install the `socksio` package to run Python scripts correctly:

```bash
pip install socksio
uv add socksio
```

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

_P.S. CUDA memory test:_

[GitHub - ComputationalRadiationPhysics/cuda\_memtest: Fork of CUDA GPU memtest :eyeglasses:](https://github.com/ComputationalRadiationPhysics/cuda_memtest)

```bash
git clone git@github.com:ComputationalRadiationPhysics/cuda_memtest.git

# build
mkdir build
cd build
# RTX 3090 is capability 8.5 -> 85
# check here for other models: https://developer.nvidia.com/cuda-gpus
cmake -DCMAKE_CUDA_ARCHITECTURES=85 .. 
make
cd ..
mv build/cuda_memtest .

# testing
./sanity_check.sh
./cuda_memtest
```

#### Network

Check network connection:

```bash
nmcli device status
```

Benchmark network speed:

```bash
sudo apt install speedtest-cli
speedtest-cli
```

## Replicate configuration with dotfiles

The sections above document the full Ubuntu/deep-learning system setup. After the base tools are installed, the reusable shell/editor/terminal configuration can be pulled from the standalone dotfiles repo:

```bash
cd ~
git clone https://github.com/liu-qilong/dotfiles.git dotfiles
cd dotfiles
bash setup.sh
```

On the first run, `setup.sh` discovers available host profiles from files named `local/.zshrc.*` in the dotfiles repo and prompts with those profile names. Choose the profile whose local zsh file matches the machine.

For example, a CUDA/proxy workstation or GVM-style profile may add CUDA paths, `/opt/nvim-linux-x86_64/bin`, `keychain`, Clash, Pixi, and proxy variables. A simpler remote profile may only add `/opt/nvim-linux-x86_64/bin`, `keychain`, and uv's shell environment file.

The dotfiles replace the manual configuration steps for:

- zsh plugin block and history/keybinding settings
- Starship config file
- Neovim config under `~/.config/nvim`
- tmux config under `~/.tmux.conf`
- reusable Claude/Codex skills

They do not install system packages or machine-level services. Before running `setup.sh`, still complete the relevant prerequisites:

```bash
sudo apt update
sudo apt full-upgrade --yes
sudo apt install -y git zsh tmux keychain curl ca-certificates
chsh -s "$(which zsh)"
```

Also install external tools as needed: Starship, Miniconda at `~/miniconda3`, NVM/Node.js, Neovim under `/opt/nvim-linux-x86_64`, tmux plugin manager, and `fzf`. For GPU machines, still install the NVIDIA driver, optional CUDA Toolkit/NCCL, Docker, and NVIDIA Container Toolkit as documented above.

If existing real config files already exist, `setup.sh` skips them. After confirming that the old files are backed up or disposable, run:

```bash
bash setup.sh --force
```
