---
title: LaTeX frequent snippets
tags:
  - Hinton/CS/LaTeX
date: "2023-05-23"
update: "2025-04-23"
link_x: https://x.com/liu_qi_long/status/1872581509066145833
---

# LaTeX frequent snippets

## Basic elements

### Section numbering

Alphabetical numbering:

```latex
\renewcommand{\thesection}{\Alph{section}}
\setcounter{section}{0} % reset counter to start from A
```

### Math

Matrix:

```latex
\begin{bmatrix}
    x_{11} & x_{12} & x_{13} & \dots & x_{1n} \\
    x_{21} & x_{22} & x_{23} & \dots & x_{2n} \\
    x_{d1} & x_{d2} & x_{d3} & \dots & x_{dn} \\
\end{bmatrix}
```

Matrix bolding:

```
\mathbf
```

Transpose:

```
^\top
```

$\hat x, \tilde x, \overline x$:

```
\hat x, \tilde x, \overline x
```

Argmin with centered subscript:

```latex
\underset{\Theta_p, \Theta_s, \Theta_a}{\operatorname{argmin}}
```

Additional symbols:

> [List of LaTeX mathematical symbols - OeisWiki](https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols)

### Listing

```latex
\begin{itemize}
    \item 
\end{itemize}
```
```latex
\begin{enumerate}
    \item 
\end{enumerate}
```

### Algorithm

```latex
\usepackage{algorithm}
\usepackage{algpseudocode}
```

```latex
\begin{algorithm}
\caption{Functional Map Refinement}
\label{alg:fmap_refinement}
\begin{algorithmic}[1]
    \State Set $C_\text{refined} \gets C_{\mathcal Y\mathcal X}$
    \For{$t = 1, \ldots, n_\text{iter}$}
        \State ...
        \State ...
        \State ...
    \EndFor
    \State ...
    \State \Return $\Pi_\text{refined}$
\end{algorithmic}
\end{algorithm}
```

### Table

```latex
\begin{table}[h]
	\centering
	\caption{<>}
	\label{tab:<>}
	\vskip5pt
	\begin{tabular}{lcc}
		\toprule
		& & \\
		\midrule
		& & \\
		\bottomrule
	\end{tabular}
\end{table}
```

_P.S. `booktabs` package needed._

_P.S. Snippets for marking 1st, 2nd, and 3rd best methods. `\usepackage[dvipsnames, table]{xcolor}` needed:_

```latex
% marking 1st, 2nd, and 3rd best methods in table
\colorlet{bestclr}{teal!60}
\colorlet{secondclr}{teal!40}
\colorlet{thirdclr}{teal!20}
\newcommand{\firstplace}{\cellcolor{bestclr}\bfseries}
\newcommand{\secondplace}{\cellcolor{secondclr}}
\newcommand{\thirdplace}{\cellcolor{thirdclr}}
\def\tabclrscheme{The \colorbox{bestclr}{\textbf{first}}/\colorbox{secondclr}{second}/\colorbox{thirdclr}{third} best results are highlighted, respectively.}

```

### Figure

```latex
\centering\includegraphics[width=\textwidth]{figures/}
```

```latex
\centering\animategraphics[loop, autoplay, every=1, width=\textwidth]{5}{figures/<folder>/<name>-}{0}{<end>}
```

_P.S. Additional options: `palindrome` `playback`._

```latex
\begin{figure}[h]
	\centering
	\includegraphics[width=\linewidth]{figures/<>}
	\caption{<>}
	\label{fig:<>}
\end{figure}
```

_P.S. `graphicx` package is needed._

```latex
\begin{figure}[h]
\centering
	\begin{subfigure}{\linewidth}
		\centering\includegraphics[width=\linewidth]{figures/<>}
		\caption{<>}
	\end{subfigure}
	\caption{<>}
	\label{fig:<>}
\end{figure}
```

_P.S. `graphicx` and `subcaption` package is needed._

### Emoji

> [Inserting emojis in LaTeX documents on Overleaf - Overleaf, Online LaTeX Editor](https://www.overleaf.com/learn/latex/Questions/Inserting_emojis_in_LaTeX_documents_on_Overleaf)

```
\usepackage{emoji}
...
\emoji{<code>}
```

Emoji code reference:

> [The `emoji` package documentation](https://texdoc.org/serve/emoji/0)

_P.S. To include emojis, `luatex` is needed to be used for typesetting._

### Code block

```latex
\begin{lstlisting}[language=Python]

\end{lstlisting}
```

_P.S. `listings` package is needed._

```latex
\begin{frame}[fragile]{}
\begin{lstlisting}[language=Python]

\end{lstlisting}
\end{frame}
```

_P.S. When used within a beamer frame, the frame need to be set as `[fragile]` to use `lstlisting`:_

Example code block styling:

```latex
% code block style
\definecolor{codegreen}{RGB}{101,218,120}
\definecolor{darkgreen}{RGB}{93,158,82}
\definecolor{darkyellow}{RGB}{245,194,105}
\definecolor{codegray}{rgb}{0.5,0.5,0.5}
\definecolor{codepurple}{rgb}{0.58,0,0.82}
\definecolor{backcolour}{rgb}{0.95,0.95,0.92}

\lstdefinestyle{mystyle}{
    commentstyle=\color{airforceblue},
    keywordstyle=\color{magenta},
    numberstyle=\tiny\color{codegray},
    stringstyle=\color{codepurple},
    basicstyle=\ttfamily\scriptsize,
    breakatwhitespace=false,
    breaklines=true,
    captionpos=b,
    keepspaces=true,
    numbers=left,
    numbersep=5pt,
    showspaces=false,
    showstringspaces=false,
    showtabs=false,
    tabsize=4,
    xleftmargin=10pt,
    xrightmargin=10pt,
}

\lstset{style=mystyle}
```

### Bibliography

```latex
\usepackage[style=ieee]{biblatex}
\addbibresource{../../contents/biblio.bib}
```

Then inside the `\begin{document} ... \end{document}`:

```latex
% bibliography
\printbibliography
```

### Reference

```latex
\usepackage{hyperref}
\hypersetup{
    colorlinks,
    linkcolor={black},
    citecolor={black},
    urlcolor={black}
}

\renewcommand{\sectionautorefname}{Section}
\renewcommand{\subsectionautorefname}{Section}
\renewcommand{\subsubsectionautorefname}{Section}
\renewcommand{\figureautorefname}{Fig.}
\renewcommand{\tableautorefname}{Table}
```

Then you can just `\autoref{}` sections, figures, and tables without having to manually type prefix like  `Fig.~\ref{}`.

However, for equation, use `\eqref{}`.

### Footnote

> [Footnotes | Overleaf](https://www.overleaf.com/learn/latex/Footnotes#Changing_the_numbering_style)

```latex
\footnote<[id]>{...}
\footnotemark<[id]>
\footnotetext<[id]>{...}
```

Changing footnote mark:

- `\arabic{_counter variable_}`: typeset `_counter variable_` in Arabic numerals.
- `\roman{_counter variable_}`: typeset `_counter variable_` in lowercase Roman numerals.
- `\Roman{_counter variable_}`: typeset `_counter variable_` in uppercase Roman numerals.
- `\alph{_counter variable_}`: typeset `_counter variable_` in lowercase Alphabetic characters.
- `\Alph{_counter variable_}`: typeset `_counter variable_` in uppercase Alphabetic characters.
- `\fnsymbol{_counter variable_}`: typeset `_counter variable_` using a [set of 9 special symbols](https://www.overleaf.com/learn/latex/Counters%23Accessing_and_printing_counter_values#.5Cfnsymbol.7Bsomecounter.7D).

```latex
\renewcommand{\thefootnote}{<\style>{footnote}}
```

_P.S. This can be used inside the document to change style for various times._

_P.S. In the min page environment, use `mpfootnote` variable instead of `footnoe`:_

```latex
\renewcommand{\thempfootnote}{<\style>{mpfootnote}}
```

## Beamer

> [Beamer - Overleaf, Online LaTeX Editor](https://www.overleaf.com/learn/latex/Beamer)

### Partition

```latex
\begin{frame}{}
    
\end{frame}
```
```latex
\begin{columns}
    \begin{column}{0.5\textwidth}
        
    \end{column}
    \begin{column}{0.5\textwidth}
        
    \end{column}
\end{columns}
```
```latex
\begin{block}{}
    
\end{block}
```
```latex
\begin{block}{}
    \begin{lstlisting}[language=Python]
        
    \end{lstlisting}
\end{block}
```

### Visibility

In Beamers, the following commands can be used to control the visibility of the elements:

```latex
\only<>{}
```

```latex
\visbile<>{}
```

In `itemize` and `enumerate` environments, you don't need to manually write these commands for 1-by-1 roll out. Just use `<+->` or `<+>`:

- Appears one by one:

```latex
\begin{itemize}[<+->]
    \item First
    \item Second
    \item Third
\end{itemize}
```

- Appears one by one with the previous one disappears:

```latex
\begin{itemize}[<+>]
    \item First
    \item Second
    \item Third
\end{itemize}
```

## Tikz

Writing in Tikz could be painful if we don't follow a good structure/pattern. The most important principles are:

- Define the styles in a separate place and reuse them in the diagram.
- Use `scope` to group a series of related elements and give the `scope` a name, so that its position can be referenced like a node. For example, `<scope>.center`, `<scope>.south`, etc.
- Always align two elements relatively as long as possible, rather than hard coding their absolute positions.
	- Use `chains` for aligning a chain of nodes (within a `scope` or `tikzpicture`) to avoid specifying alignment direction & distance in every node.
	- Use `calc` for programmatically assign position to a node.
- Use `\for` loop and `\newcommand` to draw repeated elements.

Following these principles can make the Tikz diagram human-readable, maintainable, and, most importantly, elegant.

### Include packages

```latex
\documentclass[10pt, border=5mm]{standalone}
\usepackage{amstext}  % for text in math mode
\usepackage[dvipsnames]{xcolor} % for color names
\usepackage{tikz}  % for drawing
\usepackage{pgf}  % for key=value style command variables
\usepackage{pgfplots}  % for plotting

\usetikzlibrary{
    chains,
    positioning,
    calc,
    fit,
    arrows.meta,
    shapes.geometric,
}
```

### Define styles

```latex
\tikzset{
    basicnode/.style = {
        rectangle, rounded corners, minimum width=1.5cm, minimum height=0.5cm, text centered, align=center, draw=black, fill=blue!20
    },
    boundingbox/.style = {draw=black, dashed},
    inputnode/.style = {draw=black, rounded corners, dashed, align=center},
    postblc/.style = {basicnode, fill=yellow!20, minimum width=1cm},
    clsblc/.style = {basicnode, fill=lightgray, minimum width=1cm},
    connect/.style = {thick},
    arrow/.style = {connect, ->, >=stealth},
    joint/.style = {circle, thin, fill=lightgray, draw, minimum size=0.25cm, inner sep=0pt, outer sep=0pt, label=center:+},
}
```

### Body

```latex
\begin{document}
\begin{tikzpicture} [node distance=0cm]

\end{tikzpicture}
\end{document}
```

#### Scope

```latex
\begin{scope} [local bounding box=<id>, xshift=<>cm, yshift=<>cm]
	...
\end{scope}
```

_P.S. `xshift` and `yshift` shift the whole bounding box, making location adjustment much easier._

### Alignment

#### Relative alignment

```latex
\node (<id>) [<style>, below=of <id>] {}
\node (<id>) [<style>, above=of <id>] {}
\node (<id>) [<style>, left=of <id>] {}
\node (<id>) [<style>, right=of <id>] {}
```

_P.S. `xshift` & `yshift` for fine-grained adjustment._

_P.S. Use `label=<direction>:<text>`_ to add label to a node. If multi-line is needed, use `label=<direction>:{\parabox{<size>}{<text>}`.

#### Chain

> [Chains - PGF/TikZ Manual](https://tikz.dev/library-chains)

```latex
\begin{tikzpicture}[
    start chain=1 going right,
    start chain=2 going below,
    node distance=5mm,
    every node/.style=draw,
    every on chain/.style={join=by arrow},
    ]
  \node [on chain=1] {A};
  \node [on chain=1] {B};
  \node [on chain=1] {C};

  \node [on chain=2] at (0.5,-.5) {0};
  \node [on chain=2] {1};
  \node [on chain=2] {2};

  \node [on chain=1] {D};
\end{tikzpicture}
```

#### Calc

```latex
\node (A) at (0,0) {A};
\node (B) at ($(A) + (2,1)$) {B};
\node (C) at ($(C |- B)$) {D};  % (C_x, B_y)
\node (D) at ($(C -| B)$) {D};  % (C_y, B_x)
```

#### Fit

```latex
\node (<id>) [<style>, fit={(<id>) (<coord>) <...>}] {};
```

e.g.

```latex
\node [draw, dashed, fit={(vertex) (padded_vertex)}, label=above:Vertex Input] {};
```

#### Reusable stuff

```latex
\newcommand{\tikzdashbox}[1]{%
    \tikz[baseline=(X.base)]{%
        \node[draw, dashed, rounded corners, inner sep=5pt] (X) {#1};%
    }%
}
```

## New command & for loop

```latex
\documentclass{article}
\usepackage{tikz}

\newcommand{\mycircle}[3]{
    \node[circle, draw, fill=#1, minimum size=1cm] at (#2, #3) {};
}

\begin{document}
\begin{tikzpicture}
    \foreach \x in {0, 1, 2, 3} {
	    \foreach \y in {0, 1, 2} {
            \mycircle{blue}{\x}{\y};
	    }
	}
\end{tikzpicture}
\end{document}
```

## Typesetting engine selection in VS Code plugin

### `luatex`

To use `luatex` in VS Code LaTeX plugin:

> [luatex - LuaLaTeX not recognised as a VS Code tool - TeX - LaTeX Stack Exchange](https://tex.stackexchange.com/questions/455648/lualatex-not-recognised-as-a-vs-code-tool)

```
# .vscode/settings.json
"latex-workshop.latex.recipe.default": "latexmk (lualatex)",
```

### `xelatex`

_P.S. To use `xelatex` in VS Code LaTeX plugin:_

> [xetex - How to use visual studio code LaTex Workshop with xelatex - TeX - LaTeX Stack Exchange](https://tex.stackexchange.com/questions/564758/how-to-use-visual-studio-code-latex-workshop-with-xelatex)

```
# .vscode/settings.json
"latex-workshop.latex.recipe.default": "latexmk (xelatex)",
```

## `.gitignore`

```git
# gitignore
.DS_Store
.idea/
log/

build/
*.aux
*.log
*.nav
*.out
*.snm
*.toc
*.synctex.gz
*.toc.vrb
*.vrb
*.bbl
*.bcf
*.run.xml
*.blg
*.pdf
*.sav
*.fdb_latexmk
*.fls
*.brf

*.docx

# ignore pdf files except for those in the figures/ folder
*.pdf
!figures/**/*.pdf
```

## PDF postprocessing

### Reducing PDF size

Downsize PDF files without image quality loss using [Ghostscript](https://ghostscript.readthedocs.io/en/latest/Readme.html):

```bash
gs \
  -sDEVICE=pdfwrite \
  -dCompatibilityLevel=1.6 \
  -dNOPAUSE \
  -dQUIET \
  -dBATCH \
  -dDetectDuplicateImages=true \
  -dCompressFonts=true \
  -dSubsetFonts=true \
  -dDownsampleColorImages=false \
  -dDownsampleGrayImages=false \
  -dDownsampleMonoImages=false \
  -sOutputFile=compressed.pdf \
  main.pdf
```

If image compression is necessary:

```bash
gs \
  -sDEVICE=pdfwrite \
  -dCompatibilityLevel=1.6 \
  -dNOPAUSE \
  -dQUIET \
  -dBATCH \
  -dDetectDuplicateImages=true \
  -dCompressFonts=true \
  -dSubsetFonts=true \
  -dDownsampleColorImages=true \
  -dColorImageResolution=300 \
  -dDownsampleGrayImages=true \
  -dGrayImageResolution=300 \
  -dDownsampleMonoImages=true \
  -dMonoImageResolution=300 \
  -sOutputFile=compressed.pdf \
  main.pdf
```

_P.S. `gs` is usually shipped with an Ubuntu Desktop system. On macOS, it is installed when you install [MacTeX](https://www.tug.org/mactex/)._

### PDF page trimming

```bash
gs \
  -sDEVICE=pdfwrite \
  -dNOPAUSE \
  -dQUIET \
  -dBATCH \
  -dFirstPage=1 \
  -dLastPage=9 \
  -sOutputFile=main.trimmed.pdf \
  main.pdf
```

Example:

- Keep the main text (to page 9)
- Keep the appendix (from page 10)

```bash
gs \
  -sDEVICE=pdfwrite \
  -dNOPAUSE \
  -dQUIET \
  -dBATCH \
  -dLastPage=9 \
  -sOutputFile=main-paper.pdf \
  main.pdf

gs \
  -sDEVICE=pdfwrite \
  -dNOPAUSE \
  -dQUIET \
  -dBATCH \
  -dFirstPage=10 \
  -sOutputFile=main-appendix.pdf \
  main.pdf
```
