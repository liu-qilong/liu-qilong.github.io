import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'


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

    // use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data,
    }
}