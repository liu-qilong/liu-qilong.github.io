---
title: "Setup Windows development environment"
date: "2023-06-08"
update: "2023-06-11"
link:
    medium: "https://medium.com/@tob-knpob/setup-windows-development-environment-db5b4cf3dfec"
---

Recently, I tried to set up a Windows machine for development, focusing on Python, machine learning (PyTorch with CUDA), and web development (Node.js with NPM). Following is the summarization of some critical steps and relevant materials.

Later, I further set it up as a `ssh` server that can be accessed by my laptop over the internet. If you are interested, please check [this post](/blog/2023-win-ssh-host).

## PowerShell

In Windows, PowerShell is more powerful than the legacy `cmd` shell in terms of system administration, configuration management, and perform administrative tasks. 

### Terminal execution policy

Firstly, enter PowerShell in administrator mode and modify the execution policy to enable shell scripting:

```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
```

### Powershell autocomplete

> [Fish-like Autosuggestion in Powershell - DEV Community](https://dev.to/animo/fish-like-autosuggestion-in-powershell-21ec)

## Microsoft C++ build tools

And then, as a preparation step, install [Microsoft C++ Build Tools - Visual Studio](https://visualstudio.microsoft.com/zh-hant/visual-cpp-build-tools/) and add the _C++ build tools_ so that some useful build tools like `cmake` is ready for use.

_P.S. Without these build tools, some packages will not be able to install via `pip`._

## Git

### Install

> [Git - Downloading Package](https://git-scm.com/download/win)

Install `git` using `winget` is very convenient:

```
winget install --id Git.Git -e --source winget
```

### Configuration

Let's configure its default user name and user email. Noted that when you push commit to GitHub, the email will be used to identify your GitHub account:

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
Get-Content ~/.ssh/id_rsa.pub
```

## Python and Conda

Install [Anaconda](https://www.anaconda.com).

### Path

It's worth noting that the latest version of the Anaconda installer seems no longer to provide the _add anaconda path to environment variable_ option. Therefore it has to be settled manually...

On Windows 11: Settings -> search _Edit the system environment variables_ -> Select `Path` and click `Edit` -> Click `Add` and enter `<anaconda install folder>\Scripts`

_P.S. The default installation folder of Anaconda is `C:\ProgramData\anaconda3`_.

### Init `conda` in PowerShell

Enter PowerShell in administrator mode and run:

```
conda init powershell
```

After restarting the terminal, verify `conda` with:

```
conda env list
conda activate base
```

## CUDA and PyTorch

Select the appropriate Python, CUDA, and PyTorch version based on the webpage below:

> [Start Locally | PyTorch](https://pytorch.org/get-started/locally/)

### Install Nvidia driver and CUDA

Select the corresponding driver according to the GPU model. For example, the Dell laptop of my team has a GeForce GTX 1660 Ti:

> [Official Drivers | NVIDIA](https://www.nvidia.com/download/index.aspx)

Download and install CUDA:

> [CUDA Toolkit 11.8 Downloads | NVIDIA Developer](https://developer.nvidia.com/cuda-11-8-0-download-archive)

Verify installation:

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

## Node.js and NPM

Download from Node.js's official site and install it following the prompts should get it done:

> [Node.js](https://nodejs.org/en)

Restart the PowerShell and verify the installation:

```
node -v
npm -v
```

In case you encounter any issues:

> [Installation of Node.js on Windows - mayank021](https://www.geeksforgeeks.org/installation-of-node-js-on-windows/)

## Visual Studio Code

Install [Visual Studio Code](https://code.visualstudio.com)

### `code` command

To add `code` command for launching VS Code from terminal to read files, remember to select the corresponding options during installation.

### Default terminal

> [bash - VSCode Change Default Terminal - Stack Overflow](https://stackoverflow.com/questions/44435697/vscode-change-default-terminal)

Press `Ctrl + Enter + P` to trigger the command plate and enter `Terminal: Select Default Profile`. In my case, I select PowerShell.