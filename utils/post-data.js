import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

import {read} from 'to-vfile'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'


export function getSortedPostsData ( relativePath ) {
    const postsDirectory = path.join(process.cwd(), relativePath)
    let fileNames = fs.readdirSync(postsDirectory)

    const allPostsData = fileNames.map(fileName => {
        // remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })

    // sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds ( relativePath ) {
    const postsDirectory = path.join(process.cwd(), relativePath)
    const fileNames = fs.readdirSync(postsDirectory)
        return fileNames.map(fileName => {
            return {
                params: {
                id: fileName.replace(/\.md$/, '')
                }
            }
    })
}

export async function getPostData ( id, relativePath ) {
    const postsDirectory = path.join(process.cwd(), relativePath)
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // use remark-gfm to convert markdown into html string
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(matterResult.content)

    const content = String(file)

    // combine the data with the id and contentHtml
    return {
        id,
        content,
        ...matterResult.data,
    }
}