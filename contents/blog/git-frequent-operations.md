---
title: Git frequent operations
tags:
  - Hinton/CS/Git
date: "2024-12-26"
update: 
link_x: https://x.com/liu_qi_long/status/1872581308846952651
---

# Git frequent operations

## Basic configurations

User name:

```bash
git config --global user.name "<Your Name>"
```

Email:

```bash
git config --global user.email "<email@example.com>"
```

Main branch name:

```bash
git config --global init.defaultBranch <name>
```

List all configurations:

```bash
git config --list
```

_P.S. Change main branch name of an existed repository:_

```bash
git branch -m <old name> <new name>
```

_If it has been pushed to remote:_

```bash
git push <remote> --delete <old name>
git push -u <remote> <new name>
```

## Local repository operations

### Initialize the repository

```bash
git init
```

### Current branch operations

#### Discard changes

```bash
git restore <file>
```

Discard all files changes:

```bash
git restore .
```

#### Stage changes

```bash
git add <file>
```

_P.S. Use `-f` to force stage a file even if it's set to be ignored in `.gitignore`._

- Unstage the file changes:

```bash
git restore --staged <file>
```

_P.S. Unstage all files' changes:_

```bash
git reset
```

- Discard the changes in the working directory:

```bash
git restore .
```

```bash
git restore <file>
```

_P.S. The difference is `git restore --staged <file>` affects the staging area by removing the file from it, but leaves the working directory unchanged. `git restore <file>` affects the working directory by discarding changes in the specified file (to match the version in the staging area or the last committed state if the file is not staged), but leaves the staging area unchanged._

- Remove an added file:

```bash
git rm --cached <file>
```

_P.S. Without the `--cached` flag, the file will not only be removed but also be deleted._

#### Commit changes

```bash
git commit -m "<commit>"
```

_P.S. To write multiple lines of commit message, use `-m` multiple times:_

```bash
git commit -m "<line1>" -m "<line2>" -m "<line3>"
```

#### Version rollback

```bash
git reset --hard <commit>
```

_P.S. If without `--hard`, the changes will be kept in the working directory but the version rollback to the specified commit._

_P.S. The current commit can be referred to as `HEAD`. `HEAD^` refers to the last commit, `HEAD^^` refers to the second last commit, and so on._

#### Stash

Stash let you create a snapshot of your changes and save it on a stack. All changes will then be reset to the last commit, and you can do something else safely:

```bash
git stash (save "<message>")
git stash (save "<message") -u  # also stash untracked files
```


View all stashes:

```bash
git stash list
```

When you want to restore the stashed changes:

```bash
git stash pop  # applies the most recent stash and removes it from the stash stack
git stash apply  # applies the most recent stash but keeps it in the stash list
git stash apply stash@{n}  # applies a specific stash by index
git stash drop stash@{n}  # deletes a specific stash from the list
```

### Branch operations

View all branches:

```bash
git branch
```

Create new branch:

```bash
git branch <branch>
```

Switch branch:

```bash
git switch <branch>
```

Delete branch:

```bash
git branch -D <branch name>
```

#### Merge branch

```bash
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

```bash
If you have questions, please
<<<<<<< HEAD
open an issue
=======
ask your question in IRC.
>>>>>>> branch-a
```

- Edit to resolve the conflicting parts.
- Stage the changes and commit:

```bash
git add -A
git commit -m "resolve merge conflict"
```

##### Edit vs delete a file

- Decide whether to add/remove the file:
	- To add the removed file back to your repository: `git add <file>`
	- To remove the file: 

```bash
git rm <file>
rm <file>
```

- Commit the changes:

```bash
git commit -m "resolve merge conflict"
```

## Remote repository operations

### SSH key

```bash
ssh-keygen -t rsa -C "<email>"
```

- The public key is in `~/.ssh/id_rsa.pub`. Noted that the private key `~/.ssh/id_rsa` should be kept secret.
- Add the public key to GitHub
  `Settings` > `SSH and GPG keys` > `New SSH key`


### Clone repository

```bash
git clone <link>
```

_P.S. Only clone the latest version of the main branch:_

```bash
git clone --depth=1 <link>
```

_P.S. When cloning a repository, the remote repository is automatically linked and named `origin`. However, to link existing local repository to a remote repository:_

```bash
git remote add <name> <repository link>
```

`<name>` is usually `origin`. To view all remote repository:

```bash
git remote -v
```

### Current branch operations

#### Push

Push changes to remote repository:

```bash
git push (<remote> <branch>)
```

_P.S. When push for the first time, use `-u` to set the default remote repository and branch:_

```bash
git push -u <remote> <branch>
```

_P.S. When the local repository is roll backed, use `-f` to force push:_

```bash
git push -f
```

#### Pull

Pull changes to remote repository:

```bash
git pull
```

### Fetch branch

Fetch a new branch from remote repository:

```bash
git fetch <remote> <remote_branch>:<local_branch>
```

### Manage remote repository

View remote repository:

```bash
git remote -v
```

Remove remote repository:

```bash
git remote remove <name>
```

Add remote repository:

```bash
git remote add origin <your-repo-url>
```

### Pull request management

Managing pull requests on GitHub's web interface is difficult: you either merge a pull request as a whole or reject it. A better workflow is to fetch it to a local branch, resolve possible conflicts, review/test it, and then merge it into the main branch and push. The following is an example of merging a PR:

1. Create a local branch from the main branch and fetch the PR branch into it:
	_P.S. This code can be copied from the `command-line instructions` button at the end of the PR page._
	```bash
	git checkout -b PrimeX-06-NJAU main
	git pull git@github.com:PrimeX-06/college-beamer.git NJAU
	```

2. If there are conflicts, add `--no-ff` to the previous command:
	```bash
	git pull git@github.com:PrimeX-06/college-beamer.git NJAU --no-ff
	```
	Run `git status` to see the conflicted files. Edit them to resolve the conflicts, use `git diff --check` to confirm all conflicts are resolved, and then stage and commit the changes:
	```bash
	vim <conflicted file>
	git diff --check
	git add -A
	git status
	git commit
	```
  _P.S. Before `git commit`, all changes are shown as staged/unstaged changes, including the PR's changes and your edits. Review them carefully._

3. Run additional tests/agentic reviews. If there are further edits, stage and commit the changes again.

4. Merge the PR branch to the main branch and push it to the remote repository:
	_P.S. This code can be copied from the `command-line instructions` button at the end of the PR page._
	```bash
	git checkout main
	git merge --no-ff PrimeX-06-NJAU
	git push origin main
	```
