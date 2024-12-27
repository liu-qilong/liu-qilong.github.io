---
title: LaTeX frequent snippets
tags:
  - Kolmo/Instrument/LaTeX
date: "2023-05-23"
update: 
link:
  x: https://x.com/liu_qi_long/status/1872581509066145833
---

# LaTeX frequent snippets

## Listing

```
\begin{itemize}
    \item 
\end{itemize}
```
```
\begin{enumerate}
    \item 
\end{enumerate}
```
```
\begin{lstlisting}[language=Python]

\end{lstlisting}
```

## Table

```
\begin{table}[h]
	\centering
	\begin{tabular}{lcc}
		\toprule
		& & \\
		\hline
		& & \\
		\bottomrule
	\end{tabular}
	\caption{<>}
	\label{tab:<>}
\end{table}
```

## Figure

```
\centering\includegraphics[width=\textwidth]{figures/}
```

```
\centering\animategraphics[loop, autoplay, every=1, width=\textwidth]{5}{figures/<folder>/<name>-}{0}{<end>}
```

_P.S. Additional options: `palindrome` `playback`._

```
\begin{figure}[h]
	\centering
	\includegraphics[width=\linewidth]{figures/<>}
	\caption{<>}
	\label{fig:<>}
\end{figure}
```

_P.S. `graphicx` package is needed._

```
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

```
\usepackage[style=ieee]{biblatex}
\addbibresource{../../contents/biblio.bib}
```

Then inside the `\begin{document} ... \end{document}`:

```
% bibliography
\printbibliography
```

## Beamer

> [Beamer - Overleaf, Online LaTeX Editor](https://www.overleaf.com/learn/latex/Beamer)

### Partition

```
\begin{frame}{}
    
\end{frame}
```
```
\begin{columns}
    \begin{column}{0.5\textwidth}
        
    \end{column}
    \begin{column}{0.5\textwidth}
        
    \end{column}
\end{columns}
```
```
\begin{block}{}
    
\end{block}
```
```
\begin{block}{}
    \begin{lstlisting}[language=Python]
        
    \end{lstlisting}
\end{block}
```

### Visibility

In Beamers, the following commands can be used to control the visibility of the elements:

```
\only<>{}
```

```
\visbile<>{}
```