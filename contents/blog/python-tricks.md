---
title: Python tricks
tags:
  - Hinton/Instrument/Python
date: "2025-05-18"
update:
---

# Python tricks

## Widgets

### Progress bar in Python

```bash
pip install tqdm
```

Then in the script:

```python
from tqdm import tqdm

for i in tqdm(range(100), desc="Loading..."):
    # ...
```

If the description needed to be updated at each iteration:

```python
from tqdm import tqdm

for i in (pdar := tqdm(range(100))):
   pdar.set_description('...')
   # ...
```

### Matplotlib colors

> [List of named colors — Matplotlib 3.9.2 documentation](https://matplotlib.org/stable/gallery/color/named_colors.html)
> 
> ![img](/img/matplotlib-colors.webp)
￼
My preferred ones:

* goldenrod
* teal
* olive
* lightcoral

## Environment

See also:

> [Conda frequent commands](/blog/conda-frequent-commands)

### Export conda `environment.yml`

> [Exporting the environment.yml file | conda 25.3.2.dev62 documentation](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#exporting-the-environment-yml-file)

```bash
conda env export > environment.yml
```

> [Creating an environment with commands | conda 25.3.2.dev62 documentation](https://docs.conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html#creating-an-environment-from-an-environment-yml-file)

```bash
conda env create -f environment.yml
```

Or just add packages to an existed environment:

```bash
conda env update -f environment.yml
```

### `.env` file

> [theskumar/python-dotenv: Reads key-value pairs from a .env file and can set them as environment variables. It helps in developin](https://github.com/theskumar/python-dotenv)

Install dependency:

```bash
pip install python-dotenv
```

Create .env file:

```python
<key1>='<value1>'
<key2>='<value2>'
```

Load it from Python:

```python
import os
from dotenv import load_dotenv

load_dotenv('.env')
value1 = os.getenv("key1")
value2 = os.getenv("key2")
```

Don’t forget to ignore the .env in .gitignore:

```
.env
```

## Jupyter notebook

### Add folder to Python path

```python
import sys
sys.path.append('<path>')
```

P.S. In Jupyter Notebook, if you’d like to change the executing directory directly, you can use:

```python
%cd <path>
```

> [Change IPython/Jupyter notebook working directory - Stack Overflow](https://stackoverflow.com/questions/15680463/change-ipython-jupyter-notebook-working-directory)

### Reload package in Jupyter Notebook

By adding this cell to the notebook, package can be automatically reloaded. That’s incredibly important when we are developing & testing a package on the go:

```python
%reload_ext autoreload
%autoreload 2
```

P.S. It reloads every imported package before running each cell, which may slow down the execution time.

> [python - How to make VSCode auto-reload external *.py modules? - Stack Overflow](https://stackoverflow.com/questions/56059651/how-to-make-vscode-auto-reload-external-py-modules)

A package can also be reloaded manually:

```python
import importlib
importlib.reload(<pkg>)
```

> [Auto refresh imports (support %autoreload magic) · Issue #4555 · microsoft/vscode-jupyter](https://github.com/microsoft/vscode-jupyter/issues/4555)

### Run Jupyter Notebook from terminal

> [python - How to run an .ipynb Jupyter Notebook from terminal? - Stack Overflow](https://stackoverflow.com/questions/35545402/how-to-run-an-ipynb-jupyter-notebook-from-terminal)

Running notebooks from command line have two use cases:

* Scripting notebook runs.
* Avoid having to restarting the kernel when you edit the imported packages.

```bash
pip install nbconvert
```
Then:

```bash
jupyter nbconvert --execute --to notebook --inplace <notebook>
```

To make it easier to type:

```bash
alias nbx="jupyter nbconvert --execute --to notebook --inplace"
nbx <notebook>
```

P.S. It can be accompanied by command line arguments, e.g.:

```bash
owner=Knpob nbx convert-alipay.ipynb
```

Then in the notebooks:

```python
import os

try:
    owner = os.environ['owner']
except:
    pass
```

### Git ignore Jupyter Notebook outputs

> [How to commit jupyter notebooks without output to git while keeping the notebooks outputs intact locally](https://gist.github.com/33eyes/431e3d432f73371509d176d0dfb95b6e)

* Add a filter to git config by running the following command in bash inside the repo:

```bash
git config filter.strip-notebook-output.clean 'jupyter nbconvert --ClearOutputPreprocessor.enabled=True --to=notebook --stdin --stdout --log-level=ERROR'
```
* Create a `.gitattributes` file inside the directory with the notebooks. Add *`.ipynb filter=strip-notebook-output` to that file:

```bash
cd <notebook folder>
touch .gitattributes
echo '*.ipynb filter=strip-notebook-output' > .gitattributes
```

* After that, commit to git as usual. The notebook output will be stripped out in git commits, but it will remain unchanged locally.

This gist is based on @dirkjot's answer.
> [How to clear Jupyter Notebook's output in all cells from the Linux terminal? - Stack Overflow](https://stackoverflow.com/questions/28908319/how-to-clear-jupyter-notebooks-output-in-all-cells-from-the-linux-terminal)

## Release to PyPI

> [Building and Publishing - Python Packaging User Guide](https://packaging.python.org/en/latest/guides/section-build-and-publish/)
> [Publishing package distribution releases using GitHub Actions CI/CD workflows - Python Packaging User Guide](https://packaging.python.org/en/latest/guides/publishing-package-distribution-releases-using-github-actions-ci-cd-workflows/)

### Prepare

```bash
pip install twine build
```

### Setup `pyproject.toml`

```toml
# local install: pip install -e .
# local build: python -m build

[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "<pkg>"
version = "<ver>"
description = "<str>"
readme = { file = "README.md", content-type = "text/markdown" }
requires-python = ">=3.7"
license = { text = "<license>" }
authors = [
  { name = "<name>", email = "<email>" }
]
dependencies = [
  "<pkg1>",
  "<pkg2>",
]

[project.urls]
Repository = "<repo link>"
# You can also add more links, e.g. Homepage, Documentation, Bug Tracker, etc.

[tool.setuptools.packages.find]
where = ["."]
include = ["<pkg folder>*"]
```

_P.S. The `pyproject.toml` can also be used for local install:_

```bash
pip install -e .
```

### Build & check

Firstly, to avoid including unnecessary or even sensitive files, e.g. you API keys in `.env` files, clone the project to other places. In that folder, build the project:

```bash
python -m build
```

Check:

```bash
twine check dist/*
```

### Upload

If you want to further confirm the release is OK, firstly upload it to TestPyPi:

```bash
twine upload --repository-url https://test.pypi.org/legacy/ dist/*
```

When you're ready, upload it to PyPI:

```bash
twine upload --repository-url dist/*
```

_P.S. You need to signup an account and acquire the API key on both [PyPI](https://pypi.org) and [TestPyPI](https://test.pypi.org), separately._

### Cleanup

Clear the `dist/` folder:

```bash
rm -rf dist/
```