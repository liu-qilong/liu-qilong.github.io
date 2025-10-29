---
title: Convert LaTeX to Word
tags:
  - Hinton/CS/LaTeX
date: "2022-05-04"
update: "2023-04-27"
link:
  medium: "https://medium.com/@liu-qilong/convert-latex-to-word-94f863f4dbdc"
  x: "https://x.com/liu_qi_long/status/1846451169734152382"
---

LaTeX is a great tool for academic writing. However, not all collaborators may be familiar with it, and at times, you may need to convert your document into a Word file for reviewing and editing purposes. In my opinion, the best tool for this task is [Pandoc](https://pandoc.org) - an open-source command-line tool for free.

Following the tutorial below, I installed `pandoc` and successfully converted `paper.tex` to `paper.docx`:

> [How to Convert from Latex to MS Word with ‘Pandoc’ - Zhelin Chen](https://medium.com/@zhelinchen91/how-to-convert-from-latex-to-ms-word-with-pandoc-f2045a762293)

In this blog, I will share a simple command snippet that converts LaTeX to Word file. Additionally, I will also discuss some aspects that were not fully covered in the aforementioned tutorial.

## Conversion command

After runing this command, a Word file will be generated in the `./word/` folder:

```
pandoc paper.tex -o word/paper.docx --reference-doc=word/template.docx --bibliography=bibliography.bib --citeproc
```

Noted that `./word/template.docx ` is a Word file serving as the referencing template and `./bibliography.bib` is the LaTeX bibliography file.

## Style the document

You may have noticed the `--reference-doc` variable here. It accepts a Word file as the template so that you can specify the styles of the generated file. You can prepared a Word file as template following these steps:

- Run the convert command without `--reference-doc`:

```bash
pandoc paper.tex -o word/template.docx --bibliography=bibliography.bib --citeproc
```

- Fine-tune the styles of the generated `./word/template.docx` file [^1]. Changing the styles of a Word document is itself a sophisticated topic. You can read the following tutorial for more detail:
	> [Customize or create new styles - Microsoft](https://support.microsoft.com/en-us/office/customize-or-create-new-styles-d38d6e47-f6fc-48eb-a607-1eb120dec563)
- Now you have a Word file that can serve as the reference template. Rerun the command and your generated Word file should look just the way you want:

```bash
pandoc paper.tex -o word/paper.docx --reference-doc=word/template.docx --bibliography=bibliography.bib --citeproc
```

[^1]: According to [Unable to create a custom reference.docx using pandoc - Stackoverflow](https://stackoverflow.com/questions/58642039/unable-to-create-a-custom-reference-docx-using-pandoc), the personal-specified template file `reference.docx` should be revised based on a pandoc default output file.

_P.S. If you'd like to reset the default template [^2], placing the `reference.docx` to `$HOME/.local/share/pandoc` then the template shall overwrite the default settings._

[^2]: Please refer to `--data-dir=DIRECTORY` entry of [Manual - Pandoc](https://pandoc.org/MANUAL.html)

## Citation style

The default citation style is (author, year). It you want other citation style, you can download it via: [GitHub - citation-style-language/styles: Official repository for Citation Style Language (CSL) citation styles.](https://github.com/citation-style-language/styles)

For example, `ieee.csl`:

```bash
curl -o word/ieee.csl https://raw.githubusercontent.com/citation-style-language/styles/master/ieee.csl

pandoc draft.tex -o word/draft.docx --reference-doc=word/template.docx --bibliography=ref.bib --citeproc --csl=word/ieee.csl
```

## Exclude all images

Pandoc usually fails to follow the images resizing instructions in LaTeX, resulting in large images occupying entire pages. For editing purposes, it may be more reader friendly to remove all images [^3]. Although Pandoc does not provide a "remove all images" option, a simple workaround can solve this problem: 

> Rename the figure folder so that the images cannot be found and Pandoc will leave it blank.

[^3]: In my case, the generated Word file is only used for editing and proofreading by my supervisor and teammates.