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


function get_markdown_file_names (post_folder) {
    return fs.readdirSync(post_folder, { withFileTypes: true })
        .filter(entry => entry.isFile() && entry.name.endsWith('.md'))
        .map(entry => entry.name)
}

function normalize_display_math (markdown) {
    let code_fence = null

    return markdown.split('\n').flatMap(line => {
        const fence_match = line.match(/^\s*(`{3,}|~{3,})/)

        if (fence_match != null) {
            const fence_marker = fence_match[1][0]
            code_fence = (code_fence === fence_marker) ? null : fence_marker
            return [line]
        }

        if (code_fence != null || !line.includes('$$')) {
            return [line]
        }

        const prefix = line.match(/^(\s*(?:>\s*)?)/)[0]
        const parts = line.slice(prefix.length).split('$$')
        const normalized_lines = []

        parts.forEach((part, index) => {
            if (part.length > 0) {
                normalized_lines.push(prefix + part)
            }

            if (index < parts.length - 1) {
                normalized_lines.push(prefix + '$$')
            }
        })

        return normalized_lines
    }).join('\n')
}

function serialize_metadata (metadata) {
    return Object.fromEntries(
        Object.entries(metadata).map(([key, value]) => {
            if (value instanceof Date) {
                return [key, value.toISOString().split('T')[0]]
            }

            return [key, value]
        })
    )
}

export function getSortedPostsData ( relativePath) {
    const post_folder = path.join(process.cwd(), relativePath)
    let file_names = get_markdown_file_names(post_folder)

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
            ...serialize_metadata(matterResult.data)
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
    const file_names = get_markdown_file_names(post_folder)
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
        .process(normalize_display_math(matterResult.content))

    const content = String(file)

    // get cover image path
    let coverpath = get_cover(relativePath, id)

    // combine the data with the id and contentHtml
    return {
        id,
        content,
        coverpath,
        ...serialize_metadata(matterResult.data),
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
