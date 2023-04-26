---
title: "Convert LaTeX to Word"
date: "2022-05-04"
---

Following the instruction of the webpage below, I successfully converted `paper.tex` to `paper.docx`:

> [How to Convert from Latex to MS Word with ‘Pandoc’ - Zhelin Chen](https://medium.com/@zhelinchen91/how-to-convert-from-latex-to-ms-word-with-pandoc-f2045a762293)

```
pandoc paper.tex -o word/paper.docx --reference-doc=word/template.docx --bibliography=bibliography.bib --citeproc
```

## Default template styles

To specify the styles[^1], I followed the instruction of the web pages below:

- According to [Unable to create a custom reference.docx using pandoc - Stackoverflow](https://stackoverflow.com/questions/58642039/unable-to-create-a-custom-reference-docx-using-pandoc), the personal-specified template file `reference.docx` should be revised based on a pandoc default output file.
- According to `--data-dir=DIRECTORY` entry of [Manual - Pandoc](https://pandoc.org/MANUAL.html), placing the `reference.docx` to `$HOME/.local/share/pandoc` then the template shall overwrite the default settings.

[^1]: Compared with the template for converting reports, the numbering of headings and the indents of text are canceled.

## Dealing with Inconsistency

But there will be some inconsistency between LaTex and the converted Word document.

- Figures Caption & Numbering
	Find all the `\begin{figure}` and add correct numbering and captions in Word correspondently.
- Equation Numbering
	Find all the `\begin{equation}` and add correct numbering in Word correspondently.
- Auto Reference
	Find all the `\autoref` and add correct reference texts in Word correspondently.
- Name (Year) Citation
	Find all the `\citeauthor` `\citeyear` and remove all duplicate year texts in Word correspondently.
- Reference "Chapter"
	It may be better to add an unnumbered "Reference" Chapter at the beginning of the title of the reference list.

## Exclude all images

Pandoc failed to follow the specific resizing instructions in LaTeX, resulting in large images that occupy an entire page each. For editing purposes, it may be more reader friendly to remove all images. Although Pandoc does not provide a "remove all images" option, a simple workaround can solve this problem: 

> Rename the figure folder so that the images cannot be found and Pandoc will leave it blank.