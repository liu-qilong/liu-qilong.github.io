import Link from 'next/link'
import PaperBlock from './post-block/paper-block'
import ProjectBlock from './post-block/project-block'
import BlogBlock from './post-block/blog-block'

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
    <div class="rounded-lg mb-6 p-6 ring-1 ring-slate-900/5 shadow-lg">
        <Link href={"/" + type}>
            <div class="hover:bg-slate-100">Recent {type}s ({total})</div>
        </Link>
        <hr class="mt-3 mb-2"></hr>
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
            {(num > maxnum) ? (
                <>
                <hr class="mt-2 mb-2"></hr>
                <Link href={"/" + type}>
                    <div class="text-sm italic hover:bg-slate-100">... (read more)
                    </div>
                </Link>
                </>
            ) : (<></>)}
        </div>
    </div>
)}