---
title: "obsidian-setup"
date: "2023-11-30"
description: "My customized Obsidian Dataview templates, including TagLens, DailyLens, and PaperThread"
link:
    github: "https://github.com/liu-qilong/obsidian-setup"
---

# My [Obsidian](https://obsidian.md) setup

I use [Obsidian](https://obsidian.md) as my major note taking tool. This repository stores my customized [Dataview](https://github.com/blacksmithgu/obsidian-dataview) templates including:

- PaperThread: Visualize papers' relations as threads
- TagLens: Show related notes in different types
- DailyLens: Benchmark my time spend, task completions, and other acitvities

## PaperThread

Visualize papers' relations as threads:

![img](https://github.com/liu-qilong/obsidian-setup/blob/main/demo/paper-thread.png?raw=true)

Generate `bibtex` of all papers for $\LaTeX$:

![img](https://github.com/liu-qilong/obsidian-setup/blob/main/demo/paper-bibtex.png?raw=true)

Retrieve a paper's meta data via `doi`:

![img](https://github.com/liu-qilong/obsidian-setup/blob/main/demo/doi2bib.png?raw=true)

## TagLens

Show related notes in different types:

![img](https://github.com/liu-qilong/obsidian-setup/blob/main/demo/tag-lens.png?raw=true)

_P.S. For a container page, you need to specify a `tag name` for it in the `alias` field, so that any note page attached with this tag will appear in this container. Obsidian plugin [Tag Wrangler](https://github.com/pjeby/tag-wrangler) is particularly handy for managing nested-tags._

## DailyLens

Benchmarks my time spend, task completions, and other acitvities:

![img](https://github.com/liu-qilong/obsidian-setup/blob/main/demo/daily-lens.png?raw=true)

## Setup

Clone this repository, renamed the repository folder as `utils/`, and place it under your Obsidian vault. Remember to install the following Obsidian plugins:

- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
- [Tag Wrangler](https://github.com/pjeby/tag-wrangler)
- [Templater](https://github.com/SilentVoid13/Templater)
- Enable Obsidian core plugin [Dialy note](https://help.obsidian.md/Plugins/Daily+notes)

Them you can create container pages _(topic, project, paper thread, etc.)_ and note pages _(note, paper, dairy, etc.)_ with templates under `utils/template`. Noted that these tempaltes works the best with Obsidian plugin [Templater](https://github.com/SilentVoid13/Templater).

> A more detialed setup guild is coming soon...
