---
title: "CV template"
date: "2024-09-20"
link:
    github: "https://github.com/liu-qilong/CV"
---

This is a simple CV template with customized functionalities.

![img](https://github.com/liu-qilong/CV/blob/main/gallery/CV.png?raw=true)

## How to use this template

### Import the template package

First add the package `myCV` to the preamble:

```
\usepackage{myCV}
```

### Meta information

Then add the following meta information, e.g.:

```
\name{A Cool Cat}
\email{coolcat@mail.com}
\profile{profile.jpg}
\setProfileWidth{3.5cm}
```

You can add links bar under your name by adding:

```
\addlink
    {https://scholar.google.com/citations?user=N2-7ArsAAAAJ&hl=en}
    {Google Scholar \includegraphics[height=0.3cm]{icon/google-scholar.png}}
\addlink
    {https://orcid.org/0000-0001-7843-1925}
    {ORCID \includegraphics[height=0.3cm]{icon/orcid.png}}
\addlink
    {https://github.com/liu-qilong}
    {GitHub \includegraphics[height=0.3cm]{icon/github.png}}
\addlink
    {https://qilong-liu.vercel.app}
    {Homepage \includegraphics[height=0.3cm]{icon/blog.png}}
% ...
```

Noted that the first argument is the link and the second argument is the icon with the link name.

Moreover, you can add a information columns under the links bar by adding:

```
\addinfo{Position}{Cat}
\addinfo{Base}{Hong Kong}
\addinfo{Salary Expectation}{HKD 200w}
\addinfo{Institution}{CoolCat Ltd.}
% ...
```

### Add resume columns

The following code adds a two column resume block, which is most suitable for adding education/work experience:

```
\section{Education}

\resumeColumnsStart
    \resumeEntry
        {The Hong Kong Polytechnic University
        }{Sep 2021 -- Feb 2024}
        {Master of Philosophy}{Hong Kong, China}
    \resumeSubline
        {and AiDLab}{}
    \resumeSubline
        {Supervised by Prof. Kit-lun Yick and co-supervised by Prof. Joanne Yip and Dr. Yue Sun}
\resumeColumnsEnd
```

You can see two commands:

- `resumeEntry` has 4 arguments, which create a 2x2 entry in resume columns. Noted that the first 2 arguments are used for the main line whereas the last 2 arguments are used for the subline.
- `resumeSubline` has 2 arguments, which create a 1x2 entry in resume columns. Noted that the first 2 arguments are used for the main line.

A complete example can be found in `static/cv.pdf`.

### Add resume listings

The following code adds a listings resume block, which is most suitable for adding publication list:

```
\section{Publications}

\bibliographystyle{unsrt}
\nobibliography{publications.bib}

\begin{resumeItemize}
    \item \textbf{Journal}
    \item \bibentry{LiuQilong2024}
    \item \bibentry{ZhangLiying2024}
\end{resumeItemize}
```

Here the `bibentry` is used to present a publication. Please add `natbib` and `bibentry` packages to the preamble:

```
\usepackage{natbib}
\usepackage{bibentry}
```

A complete example can be found in `static/cv.pdf`.

### Add a paragraph

To ensure consistent left margin, it's suggested to warp the paragraphs in the `resumeItemize` environment:

```
\section{Research interests}

\begin{resumeItemize}
    \item 3D computer vision; 4D scene reconstruction; Dense motion tracking; Statistical human modeling; Human-computer interaction; AI for design.
\end{resumeItemize}
```