---
title: Git frequent operations
tags:
  - Kolmo/Instrument/Git
date: "2024-12-26"
update: 
link:
  x: https://x.com/liu_qi_long/status/1872581308846952651
---

# Git frequent operations

## Basic configurations

User name:

```
git config --global user.name "<Your Name>"
```

Email:

```
git config --global user.email "<email@example.com>"
```

Main branch name:

```
git config --global init.defaultBranch <name>
```

_P.S. Change main branch name of an existed repository:_

```
git branch -m <old name> <new name>
```

_If it has been pushed to remote:_

```
git push <remote> --delete <old name>
git push -u <remote> <new name>
```

## Local repository operations

### Initialize the repository

```
git init
```

### Current branch operations

#### Stage changes

```
git add <file>
```

_P.S. Use `-f` to force stage a file even if it's set to be ignored in `.gitignore`._

Unstage the file changes:

```
git restore --staged <file>
```

Discard the changes in the working directory:

```
git restore <file>
```

_P.S. The difference is `git restore --staged <file>` affects the staging area by removing the file from it, but leaves the working directory unchanged. `git restore <file>` affects the working directory by discarding changes in the specified file (to match the version in the staging area or the last committed state if the file is not staged), but leaves the staging area unchanged._

#### Commit changes

```
git commit -m "<commit>"
```

_P.S. To write multiple lines of commit message, use `-m` multiple times:_

```
git commit -m "<line1>" -m "<line2>" -m "<line3>"
```

#### Version rollback

```
git reset --hard <commit>
```

_P.S. If without `--hard`, the changes will be kept in the working directory but the version rollback to the specified commit._

_P.S. The current commit can be referred to as `HEAD`. `HEAD^` refers to the last commit, `HEAD^^` refers to the second last commit, and so on._

### Branch operations

View all branches:

```
git branch
```

Create new branch:

```
git branch <branch>
```

Switch branch:

```
git switch <branch>
```

Delete branch:

```
git branch -D <branch name>
```

#### Merge branch

```
git merge --no-ff -m "<commit>" <branch>
```

#### Resolve merge conflicts

> [Resolving a merge conflict using the command line - GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line)
> Merge conflicts occur when competing changes are made to _the same line of a file_, or when one person edits a file and another person deletes the same file.

When you run `git merge` and there are conflicts:

1. Git pauses the merge process and marks the conflicting files.
2. You resolve the conflicts manually by editing the files.
3. Once resolved, you stage the changes (e.g., `git add`) and commit them with a message like `"resolve merge conflict"`.

 ##### Edit the same line of a file

- Search for `<<<<<<<` to locate the conflicts. It will be something like:

```
If you have questions, please
<<<<<<< HEAD
open an issue
=======
ask your question in IRC.
>>>>>>> branch-a
```

- Edit to resolve the conflicting parts.
- Stage the changes and commit:

```
git add -A
git commit -m "resolve merge conflict"
```

##### Edit vs delete a file

- Decide whether to add/remove the file:
	- To add the removed file back to your repository: `git add <file>`
	- To remove the file: 

```
git rm <file>
rm <file>
```

- Commit the changes:

```
git commit -m "resolve merge conflict"
```

## Remote repository operations

### SSH key

```zsh
ssh-keygen -t rsa -C "<email>"
```

- The public key is in `~/.ssh/id_rsa.pub`. Noted that the private key `~/.ssh/id_rsa` should be kept secret.
- Add the public key to GitHub
  `Settings` > `SSH and GPG keys` > `New SSH key`


### Clone repository

```
git clone <link>
```

_P.S. Only clone the latest version of the main branch:_

```
git clone --depth=1 <link>
```

_P.S. When cloning a repository, the remote repository is automatically linked and named `origin`. However, to link existing local repository to a remote repository:_

```
git remote add <name> <repository link>
```

`<name>` is usually `origin`. To view all remote repository:

```
git remote -v
```

### Current branch operations

#### Push

Push changes to remote repository:

```
git push (<remote> <branch>)
```

_P.S. When push for the first time, use `-u` to set the default remote repository and branch:_

```
git push -u <remote> <branch>
```

_P.S. When the local repository is roll backed, use `-f` to force push:_

```
git push -f
```

#### Pull

Pull changes to remote repository:

```
git pull
```

### Fetch branch

Fetch a new branch from remote repository:

```
git fetch <remote> <remote_branch>:<local_branch>
```