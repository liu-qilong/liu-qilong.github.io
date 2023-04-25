import Link from 'next/link'
import PaperBlock from './block/paper-block'
import ProjectBlock from './block/project-block'
import BlogBlock from './block/blog-block'

export default function RecentPost({ type, posts, maxnum }) {
    let num = 0 // idx of a post
    let total = Object.keys(posts).length // total number of posts

    var BlockDict = {
        "paper": PaperBlock,
        "project": ProjectBlock,
        "blog": BlogBlock,
    }
    let BlockType = BlockDict[type]

    return (
    <div class="rounded-lg mb-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3">
        <Link href={"/" + type}>
            <h3 class="hover:bg-slate-100">Recent {type}s ({total})</h3>
        </Link>
        <hr></hr>
        <div>
            {posts.map( (post) => {
                num = num + 1

                if (num <= maxnum) {
                    return (
                        <div class="hover:bg-slate-100 mt-2">
                            <BlockType post={post}/>
                        </div>
                    )
                }
            })}
            {(num > maxnum) ? (<Link href={"/" + type}><h3 class="italic hover:bg-slate-100">... (see more)</h3></Link>) : (<></>)}
        </div>
    </div>
)}