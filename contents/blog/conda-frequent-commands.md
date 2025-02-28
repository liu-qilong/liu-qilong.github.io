---
title: "Conda frequent commands"
tags:
  - Hinton/Instrument/Python
date: "2023-03-08"
update: "2023-04-27"
link:
  x: "https://x.com/liu_qi_long/status/1846821855820415479"
---

# Conda frequent commands

When working on a Python project, it's considered good practice to create a virtual environment. In this case, every project is running in a separate environment, with their own dependencies. This can save you tons of headache - if you install all your projects' dependencies in one place, things may quickly crash with each other.

> I personally learned this lesson the hard way after spending an entire night trying to fix version crashes. Eventually, I had no choice but to delete everything and start from scratch.

You certainly do not want to experience the same frustration as me - and you don't have to. With `conda` virtual environment, all your projects have their own territory to play and there is zero chance for crashing with each other.

To gain a proper understanding of `conda`, the following resources will be helpful. Additionally, some commonly used commands will be extracted and listed in this blog post for easy reference.

-  [Managing conda - Conda](https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/tasks/manage-conda.html)
-  [Managing environments - Conda](https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/tasks/manage-environments.html)
-  [Managing packages - Conda](https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/tasks/manage-pkgs.html)
-  [Managing Python - Conda](https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/tasks/manage-python.html)
-  [Managing virtual packages - Conda](https://docs.conda.io/projects/continuumio-conda/en/latest/user-guide/tasks/manage-virtual.html)

## Managing conda

| task | command |
| :---: | --- |
| view conda version | `conda --version` |
| update conda | `conda update conda` |

## Managing environments

| task | command |
| :---: | --- |
| view all environments | `conda env list` |
| create new environment | `conda create -n <env_name> python=<version>` |
| remove environment | `conda remove -n <env_name> --all` |
| activate environment | `conda activate <env_name>` |
| deactivate environment | `conda deactivate` |

_P.S. Before removing an environment, deactivate the environment in all shells first._

## Managing packages

| task | command |
| :---: | --- |
| view all packages | `conda list` |
| searching for packages | `conda search <pkg_name>` |
| installing package | `conda install (--name <env_name>) <pkg_name>(=<version>)` |

## Batch installation with `requirements.txt`

You can list all dependencies of your project in a `requirements.txt` file. It's very convenient for setting up your project in another machine - for example, you bought a new laptop/desktop, or a friend want to run your scripts in his computer.

Prepare a `requirements.txt`, like this one:

```
numpy == <version>
pandas >= <version>
scipy != <version>
matplotlib <= <version>
....
```

And then, create a new virtual environment for it and batch install dependencies with `pip`:

_P.S. According to `conda`'s official documentation, issues may arise when using `pip` and `conda` together. When combining `conda` and `pip`, it is best to use an isolated `conda` environment. Only after `conda` has been used to install as many packages as possible should `pip` be used to install any remaining software._

```
conda create -n <env_name> python=<version>
conda activate <env_name>
pip install -r requirements.txt
```

Then you are all set👏