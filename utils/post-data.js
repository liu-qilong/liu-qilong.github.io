import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkRehype from 'remark-rehype'
import rehypeKatex from 'rehype-katex'
import rehypeStringify from 'rehype-stringify'


export function getSortedPostsData ( relativePath) {
    const post_folder = path.join(process.cwd(), relativePath)
    let file_names = fs.readdirSync(post_folder)

    const all_posts = file_names.map(file_name => {
        // remove ".md" from file name to get id
        const id = file_name.replace(/\.md$/, '')

        // read markdown file as string
        const full_path = path.join(post_folder, file_name)
        let file_content = fs.readFileSync(full_path, 'utf8')

        // use gray-matter to parse the post metadata section
        const matterResult = matter(file_content)
        let trim = (matterResult.content.length > 1000)?(matterResult.content.substring(0, 1000) + '...'):(matterResult.content)

        // get cover image path
        let coverpath = get_cover(relativePath, id)

        // combine the data with the id
        return {
            id,
            coverpath,
            text: String(trim)
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // remove links
                .replace(/!\[([^\]]+)\]\([^)]+\)/g, '$1') // remove images
                .replace(/[^A-Za-z0-9 ,.]/g, ' '), // remove special characters
            ...matterResult.data
        }
    })

    // sort posts by date
    let sorted_posts = all_posts.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
    
    return sorted_posts
}

export function getAllPostIds ( relativePath ) {
    const post_folder = path.join(process.cwd(), relativePath)
    const file_names = fs.readdirSync(post_folder)
        return file_names.map(file_name => {
            return {
                params: {
                    id: file_name.replace(/\.md$/, '')
                }
            }
    })
}

export async function getPostData ( id, relativePath) {
    // read post content
    const file_content = fs.readFileSync(
        path.join(process.cwd(), relativePath, `${id}.md`),
        'utf8',
        )

    // use gray-matter to parse the post metadata section
    const matterResult = matter(file_content)

    const file = await unified()
        .use(remarkParse)  // parse markdown
        .use(remarkBreaks)
        .use(remarkGfm)  // parse GitHub Flavored Markdown
        .use(remarkMath)  // parse LaTeX equations
        .use(remarkRehype)  // convert markdown to HTML
        .use(rehypeKatex)  // convert LaTeX to HTML
        .use(rehypeStringify)  // convert HTML to string
        .process(matterResult.content)

    const content = String(file)

    // get cover image path
    let coverpath = get_cover(relativePath, id)

    // combine the data with the id and contentHtml
    return {
        id,
        content,
        coverpath,
        ...matterResult.data,
    }
}

function get_cover( relativePath, id ) {
    let coverpath = ''
    let photo_base_path = ''
    let cover_folder = relativePath.replace('contents/', 'public/cover/')

    for (let format of ['.png', '.jpg', '.jpeg', '.gif']) {
        if (fs.existsSync(path.join(process.cwd(), cover_folder, `${id}${format}`))) {
            // photo_base_path = cover_folder.replace('public/', 'https://liu-qilong.github.io/')
            photo_base_path = cover_folder.replace('public/', '/')
            coverpath = `${photo_base_path}/${id}${format}`
            break
        }
    }
    return coverpath
}