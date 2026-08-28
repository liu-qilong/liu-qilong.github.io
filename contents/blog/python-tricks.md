---
title: Python tricks
tags:
  - Hinton/CS/Python
date: "2025-05-18"
update:
---

# Python tricks

## Core features

### Decoration function

```python
def decorator_func(original_func):
    def wrapper_func(*args, **kwargs):
        # do something before
        result = original_func(*args, **kwargs)
        # do something after
        return result
    return wrapper_func

@decorator_func
def target_func(...):
    # ...
```

## Loop

### Loop through a dictionary with `it` `key` `value`

```python
for it, (key, value) in dict:
	# ...
```

### Loop through combinatons of lists

```python
from itertools import product

for i, j in product(ls_1, ls_2):
  # ...
```

## Scripting

### Command line arguments

Example:

```python
import argparse

parser = argparse.ArgumentParser(description='Description of your script')
parser.add_argument('--mesh_dir', type=str, required=True, help='Path to the mesh directory')
parser.add_argument('--output', action='store_true', help='Whether to save the output')

args = parser.parse_args()
args.mesh_dir  # Access the mesh directory path
args.output  # Access the output flag (default: False)
```

### Add folder to Python path

Example:

```python
# Add project root to Python path so `from src.*` imports work
# when running this script from any directory
import os
import sys
_PROJECT_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
sys.path.insert(0, _PROJECT_ROOT)
sys.path.insert(0, os.path.join(_PROJECT_ROOT, 'pkg', 'animer'))
```

### Run script as module

Example:

```bash
python -m src.animer_grounding.run --mesh_dir /home/knpob/Documents/Hinton/data/shape-corr/SMAL_r/off/ --out_dir output/smal_r --device cuda:1
```

_The current directory is added to `sys.path`, making package-level imports resolve properly._

## Files

### Dotfiles

> [theskumar/python-dotenv: Reads key-value pairs from a .env file and can set them as environment variables. It helps in developin](https://github.com/theskumar/python-dotenv)

Install dependency:

```bash
pip install python-dotenv
```

Create a `.env` file:

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

Don’t forget to ignore `.env` in `.gitignore`:

```
.env
```

### Find all files with certain extension under a folder

```python
from glob import glob
mesh_ls = sorted(glob(str('<path>/*.<ext>')))
```

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

### Conda environment management

- Create a new environment: `conda create -n <env_name> python=<version>`
- Remove an environment: `conda remove -n <env_name> --all`
- Activate environment `conda activate <env_name>`
- Deactivate environment `conda deactivate`

#### One-off script running in a conda environment

```bash
conda run -n <env_name> python <script.py>
```

#### Export conda `environment.yml`

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

### Proxy

![[ubuntu-dev-env#Python with proxy]]

## Matplotlib

### SciencePlots

> [GitHub - garrettj403/SciencePlots: Matplotlib styles for scientific plotting · GitHub](https://github.com/garrettj403/SciencePlots)

```bash
pip install SciencePlots
```

```python
import matplotlib.pyplot as plt
import scienceplots
plt.style.use('ieee')
```

### Fontsize

```python
plt.rcParams['font.size'] = 16
```

### Axis formatter

```python
from matplotlib.ticker import FuncFormatter
# ...
ax.xaxis.set_major_formatter(FuncFormatter(lambda x, _: f'{int(x/1000)}k'))
```

### Legend

```python
ax.legend(frameon=True, edgecolor='black', framealpha=0.5, fontsize=12, loc='best')
```

## Jupyter notebook

### Register a `.venv` kernel

Example:

```bash
./pkg/PRIMA/.venv/bin/python -m ipykernel install \
  --user \
  --name prima-venv \
  --display-name "Python (PRIMA .venv)"
```

### Launching Jupyter Lab

Ensure that `jupyterlab` has been installed:

```bash
pip install jupyterlab
```

Then:

```bash
jupyter lab --no-browser --port=8888
```

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

e.g.

```python
# import self-defined modules
import importlib
import src.mod as mod

# reload the module everytime the cell is run
importlib.reload(mod)

# load what's actually needed
from src.mod import cls, func
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

Example:

```bash
cd notebook
touch .gitattributes
echo '*.ipynb filter=strip-notebook-output' > .gitattributes

cd prototype
touch .gitattributes
echo '*.ipynb filter=strip-notebook-output' > .gitattributes

cd ../..
```

* After that, commit to Git as usual. The notebook output will be stripped when the notebook is staged in Git, but the file will remain unchanged locally. _P.S. Make sure that `jupyterlab` is installed in the Python environment._

This gist is based on @dirkjot's answer.
> [How to clear Jupyter Notebook's output in all cells from the Linux terminal? - Stack Overflow](https://stackoverflow.com/questions/28908319/how-to-clear-jupyter-notebooks-output-in-all-cells-from-the-linux-terminal)

_P.S. In VS Code, the `diff` of `.ipynb` file could be selected to ignore outputs/metadata changes in the drop down menu:_

> [SOLVED - Have vscode-jupyter do proper diffing in Git · microsoft/vscode-jupyter · Discussion #10742 · GitHub](https://github.com/microsoft/vscode-jupyter/discussions/10742)

### PyVista remote rendering

![[ubuntu-dev-env#PyVista remote rendering]]

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

## Hugging Face

### Install and login

```bash
curl -LsSf https://hf.co/cli/install.sh | bash
hf auth login
```

### Download Hugging Face models to local path

> [Command Line Interface (CLI)](https://huggingface.co/docs/huggingface_hub/en/guides/cli#download-a-dataset-or-a-space)

```bash
hf download <user>/<repo> --local-dir <path>
```

### Download Hugging Face dataset to local path

> [Downloading datasets](https://huggingface.co/docs/hub/en/datasets-downloading)
> [Command Line Interface (CLI)](https://huggingface.co/docs/huggingface_hub/en/guides/cli#download-a-dataset-or-a-space)

```bash
hf download <user>/<repo> --repo-type dataset --local-dir <path>
```

### Upload local folder as Hugging Face dataset

```bash
hf upload [repo_id] [local_path] [path_in_repo]
hf upload <repo> . . # upload the current directory at the root of the repo
```

Every `hf upload` creates a commit on HF with a timestamp, so you can always roll back to a previous version via the repo's commit history on the web UI.
