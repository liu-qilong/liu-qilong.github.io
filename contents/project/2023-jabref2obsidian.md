---
title: "Jabref2Obsidian"
date: "2023-03-05"
link:
    github: "https://github.com/TOB-KNPOB/Jabref2Obsidian"
---

[![Documentation Status](https://readthedocs.org/projects/jabref2obsidian/badge/?version=latest)](https://jabref2obsidian.readthedocs.io/en/latest/?badge=latest)

`jabref2obsidian` is a tool that allows you to convert your JabRef biblatex repository to Obsidian markdown notes. This makes it easier to view your JabRef repository on any platform, including iPad where JabRef is currently not available. [^1]

[^1]: [jabref for ipad #3611](https://github.com/JabRef/jabref/issues/3611)

## Usage

Example scripts are stored in the `examples/` folder. To run the scripts, you will need to install the necessary packages listed in `requirements.txt`.

After installing the necessary packages, you can use the example script to generate:

- Markdown pages for each entry in your JabRef repository.
- Markdown pages for each group in your JabRef repository.

## Output

The output of `jabref2obsidian` is a set of Markdown files that are organized into a folder structure. The root folder contains two sub-folders:

- `Notes`: This folder contains a Markdown file for each entry in your JabRef repository. Each file contains information about the entry such as its title, author, and citation key.

![note page](https://github.com/TOB-KNPOB/Jabref2Obsidian/blob/main/docs/source/figures/note_page.png?raw=true)
_Fig. Example note page._

- `Groups`: This folder contains a Markdown file for each group in your JabRef repository. The file for each group contains a list of entries that belong to that group.
File Structure

![group page](https://github.com/TOB-KNPOB/Jabref2Obsidian/blob/main/docs/source/figures/group_page.png?raw=true)
_Fig. Example group page._

The file structure of the output folder is organized as follows:

```
output/
├── Groups/
│   ├── Group 1/
│   │   ├── Group 1.md
│   ├── Group 2/
│   │   ├── Group 2.md
│   └── ...
└── Notes/
    ├── Entry 1.md
    ├── Entry 2.md
    └── ...
```

_P.S. When outputting to the same folder again, it's recommended to quit Obsidian first. Otherwise duplicated files may occur._

## Markdown Layout

Each group page has the following layout:

- Title section: This section contains the title of the group.
- Roadmap section: This section contains the links to source- and sub-groups of the group.
- Entries section: This section contains the links to all entries associated with this group.

Each literature entry page has the following layout:

- Title section: This section contains the title of the entry.
Asset section: This section contains the citation key and a link to the file associated with the entry (if any).
- Literature review section (optional): This section contains any comments or notes related to the entry.

## License

This project is licensed under the MIT License.