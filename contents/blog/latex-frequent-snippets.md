---
title: LaTeX frequent snippets
tags:
  - Hinton/Instrument/LaTeX
date: "2023-05-23"
update: "2025-04-23"
link:
  x: https://x.com/liu_qi_long/status/1872581509066145833
---

# LaTeX frequent snippets

## Math

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

Additional symbols:

> [List of LaTeX mathematical symbols - OeisWiki](https://oeis.org/wiki/List_of_LaTeX_mathematical_symbols)

## Listing

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
```latex
\begin{lstlisting}[language=Python]

\end{lstlisting}
```

_P.S. The frame need to be set as `[fragile]` to use `lstlisting`:_

```latex
\begin{frame}[fragile]{}
\begin{lstlisting}[language=Python]

\end{lstlisting}
\end{frame}
```

## Table

```latex
\begin{table}[h]
	\centering
	\begin{tabular}{lcc}
		\toprule
		& & \\
		\midrule
		& & \\
		\bottomrule
	\end{tabular}
	\caption{<>}
	\label{tab:<>}
\end{table}
```

_P.S. `booktabs` package needed._

## Figure

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
		\includegraphics[width=\linewidth]{figures/<>}
		\caption{<>}
	\end{subfigure}
	\caption{<>}
	\label{fig:<>}
\end{figure}
```

_P.S. `graphicx` and `subcaption` package is needed._

## Bibliography

```latex
\usepackage[style=ieee]{biblatex}
\addbibresource{../../contents/biblio.bib}
```

Then inside the `\begin{document} ... \end{document}`:

```latex
% bibliography
\printbibliography
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
\begin{document} [node distance=0cm]
\begin{tikzpicture}

\end{tikzpicture}
\end{document}
```

#### Scope

```latex
\begin{scope} [local bounding box=<id>]
	...
\end{scope}
```

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

*.docx
```