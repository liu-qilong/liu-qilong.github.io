---
title: "Best practices for marking changes of LaTeX documents"
date: "2024-03-23"
update: "2024-03-24"
link:
    medium: "https://medium.com/@liu-qilong/best-practices-for-marking-changes-of-latex-documents-45451db41bb7"
---

When submitting academic manuscript, it's usually mandatory to submit the marked changes for revisions/resubmissions. Word is particularly handy in this regard. But if your manuscript is consists of lots math formula, e.g. in the field of deep learning, $\LaTeX$ is a more common choice. In this case, `latexdiff` is the go-to choice for generating the document with marked changes.

## Install `latexdiff`

Follow the instruction on the official documentation:

> [GitHub - ftilmann/latexdiff: Compares two latex files and marks up significant differences between them. Releases on www.ctan.org and mirrors](https://github.com/ftilmann/latexdiff)

## Prepare files

Copy the whole folder of the two versions of $\LaTeX$ documents that are being compared, say one is `draft@0` while the other is `draft@2`. Make sure that each of them can be successfully compiled.

### About the figures and other resources

If you stored figures in the other folder, you may have deleted or rearranged some figures as you write the new version of the draft. Therefore, it's advisable to make a local copy of the figures folder under the folder of each folder, and use match & replace to batch edit the image paths in the `.tex` file.

The same principle applies to also other resources, e.g. `.bib` files for your reference. In this case, the versional draft folder serves as a _snapshot_ of a major version - typically before a submission/resubmission. Although you may have been using Git for version control, my experience is keeping the major versions in parallel folders are more convenient than scrolling down the lengthy `git log` when you need to replicate these versions. More over, it's a prerequisite for `latexdiff` to work.

_P.S. Another approach is removing all `\includegraphics[...]{...}` in the drafts since usually only keeping the captions are suffice. This can be achieved by search and replace the following patterns with empty string using regular expression in VS Code:_

```
\\includegraphics.*
```

### Bibliography

I prefer to keep the in-text citations but delete the bibliography section since the changes of bibliography won't be marked.

## Run the command

Make a folder for the marked changes file, say `diff@1-0/`:

```
mkdir diff@1-0
latexdiff draft@0/paper.tex draft@1/paper.tex > draft@1-0/diff.tex
```

Noted that the path to the drafts should go down to the exact `.tex` file, ie. `draft@0/paper.tex` and `draft@1/paper.tex`, with the former one as the old version and the later one as the new version. `draft@1-0/diff.tex` file will be generated with marked changes between these two `.tex`, which is an ordinary $\LaTeX$ file that can be compiled separately. However, before compiling it, remember to place all [[#About the figures and other resources|figures and other resources]] to the folder of `diff.tex`.

_P.S. Here only the figures of the newer version needed to be placed since only these will be shown in the marked changes document._

## Bug fixing

### `\hspace{0pt}`

With newer versions of $\LaTeX$, a common error can be triggered by the `\hspace{0pt}` in the generated `diff.tex`.

> [citing - latexdiff with \\cite commands gives output with apparently mismatched braces - TeX - LaTeX Stack Exchange](https://tex.stackexchange.com/questions/574280/latexdiff-with-cite-commands-gives-output-with-apparently-mismatched-braces)

To fix it,  simply remove them all:

```
\hspace{0pt}
```

### Other _trouble makers_

- `\vskip<length>` may be inserted with text generated by `latexdiff`. Check each `\vskip` command to restore them back to the correct form.
- Same to `\item`s, check each of them.
- Some complex tables may leads to odd failures. If the document can't compile, considering deleting some of them. The same as figures, only keeping captions are usually enough.