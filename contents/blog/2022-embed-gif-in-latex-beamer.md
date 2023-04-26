---
title: "Embed GIF in LaTeX Beamer"
date: "2022-06-20"
---

> [Getting GIF and/or moving images into a LaTeX presentation - StackExchange](https://tex.stackexchange.com/questions/240243/getting-gif-and-or-moving-images-into-a-latex-presentation)

## Convert `gif` to `png` series

Firstly, use the command-line tool to convert `.gif` to a series of `.png`:
```
magick convert -coalesce <>.gif <>.png
```

_P.S. If the folder only have one gif and the desired output image name is `fig-<>.png`:_
```
magick convert -coalesce *.gif fig.png
```

_P.S. Sometimes we need to convert video to `gif` at the first place:_
- [ffmpeg + ImageMagick: convert video to GIF by using Terminal.app in macOS - Sergey Nikishkin](https://acronis.design/ffmpeg-imagemagick-convert-video-to-gif-using-the-terminal-app-in-macos-657948adf900)

## Embedded them to the beamer

And then add the series of `.png` as dynamic images in beamer using the `animate` package:
```
\usepackage{animate}
...
\animategraphics[loop, autoplay, controls, width=\textwidth]{10}{images/test/test-}{0}{16}
```

_P.S. Sometimes batch cropping and resizing of images are also needed: [[2022-06-28|(June 28, 2022)]]_
- [ffmpeg + ImageMagick: convert video to GIF by using Terminal.app in macOS - Sergey Nikishkin](https://acronis.design/ffmpeg-imagemagick-convert-video-to-gif-using-the-terminal-app-in-macos-657948adf900)
- [How to crop an image using ImageMagick from the command line? - StackExchange](https://superuser.com/questions/1161340/how-to-crop-an-image-using-imagemagick-from-the-command-line)
- Batch compression of images:
	- [How to resize an image through the terminal? - StackExchange](https://askubuntu.com/questions/271776/how-to-resize-an-image-through-the-terminal)
	- [How To Batch Resize Images On A Mac - Lee Stanton](https://www.alphr.com/how-to-batch-resize-images-mac/)

## Recommended PDF reader

The generated PDF file can be displayed in [Acrobat Reader](https://www.adobe.com/acrobat/pdf-reader.html) or [Foxit Reader](https://www.foxit.com) but when in full-screen slideshow mode the previous one gets blurred and the latter one has a white margin.

Eventually, I found that the best way to display slideshow was:
- Open the generated `.pdf` with with [Acrobat Reader](https://www.adobe.com/acrobat/pdf-reader.html).
- `Acrobat Reader - Preference - General` uncheck `Open documents as new tabs in the same window`.
- `View - Page Display - Single Page View`.
- Use the `read mode` by pressing `⌃ + ⌘ + H` and then press `⌃ + ⌘ + F` to enter MacOS's full screen mode.