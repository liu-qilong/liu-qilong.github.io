---
title: "Embed GIF in LaTeX Beamer"
date: "2022-06-20"
update: "2022-06-28"
link:
    medium: "https://medium.com/@tob-knpob/embed-gif-in-latex-beamer-ed5ced8c041"
---

As an research postgraduate student, I frequently make "academic-looking" slides for meetings, which comprise a lot of references, tables, charts, and sometimes math equations. LaTeX is excellent for typesetting these elements, so using LaTeX to make slides sounds like a good idea.

With tutorials like [Beamer - Overleaf](https://www.overleaf.com/learn/latex/Beamer), I got started with this approach and feel more and more comfortable. I even made a series of templates for me and my friends (for more details: [Beamer-LaTeX-Themes](/project/2022-beamer-latex)). Here are some example pages:

![PolyU](https://github.com/TOB-KNPOB/Beamer-LaTeX-Themes/blob/main/gallery/PolyU.png?raw=true)
![math](https://github.com/TOB-KNPOB/Beamer-LaTeX-Themes/blob/main/gallery/math.png?raw=true)

However, LaTeX only generates PDF files, which are usually static. Excluding videos and GIFs completely from your presentation? How pitiful. I searched the internet for a while and eventually found a simple workflow to embed GIFs in LaTeX beamer [^1].

[^1]: This workflow is inspired by: [Getting GIF and/or moving images into a LaTeX presentation - StackExchange](https://tex.stackexchange.com/questions/240243/getting-gif-and-or-moving-images-into-a-latex-presentation)

## Convert `gif` to `png` series

Firstly, use the command-line tool to convert `.gif` to a series of `.png`:

```
magick convert -coalesce <>.gif <>.png
```

_P.S. If the folder only have one GIF and the desired output image name is `fig-<>.png`:_
```
magick convert -coalesce *.gif fig.png
```

_P.S. Sometimes we need to convert video to `gif` at the first place:_
> [ffmpeg + ImageMagick: convert video to GIF by using Terminal.app in macOS - Sergey Nikishkin](https://acronis.design/ffmpeg-imagemagick-convert-video-to-gif-using-the-terminal-app-in-macos-657948adf900)

## Embedded them to the beamer

And then add the series of `.png` as dynamic images in beamer using the `animate` package:
```
\usepackage{animate}
...
\animategraphics[loop, autoplay, controls, width=\textwidth]{10}{images/test/test-}{0}{16}
```

_P.S. Sometimes format conversion, batch cropping, and resizing of videos/images are also needed. Following is some useful materials:_
> [ffmpeg + ImageMagick: convert video to GIF by using Terminal.app in macOS - Sergey Nikishkin](https://acronis.design/ffmpeg-imagemagick-convert-video-to-gif-using-the-terminal-app-in-macos-657948adf900)

> [How to crop an image using ImageMagick from the command line? - StackExchange](https://superuser.com/questions/1161340/how-to-crop-an-image-using-imagemagick-from-the-command-line)

> Batch compression of images:
> - [How to resize an image through the terminal? - StackExchange](https://askubuntu.com/questions/271776/how-to-resize-an-image-through-the-terminal)
> - [How To Batch Resize Images On A Mac - Lee Stanton](https://www.alphr.com/how-to-batch-resize-images-mac/)

## Recommended PDF reader

The generated PDF file can be displayed in [Acrobat Reader](https://www.adobe.com/acrobat/pdf-reader.html) or [Foxit Reader](https://www.foxit.com) but when in full-screen slideshow mode the previous one gets blurred and the latter one has a white margin.

Eventually, I found that the best way to display slideshow was:
- Open the generated `.pdf` with with [Acrobat Reader](https://www.adobe.com/acrobat/pdf-reader.html).
- `Acrobat Reader - Preference - General` uncheck `Open documents as new tabs in the same window`.
- `View - Page Display - Single Page View`.
- Use the `read mode` by pressing `⌃ + ⌘ + H` and then press `⌃ + ⌘ + F` to enter MacOS's full screen mode.