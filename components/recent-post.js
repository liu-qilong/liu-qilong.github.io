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

    // generate recent post body
    const recent_post_body = posts.map( (post) => {
        num = num + 1

        if (num <= maxnum) {
            return (
                <div className="hover:bg-slate-100 mt-2" key={post["id"]}>
                    <BlockType post={post}/>
                </div>
            )
        }
    })

    // generate read more
    let readmore = (<></>)
    
    if (num > maxnum) {
        readmore = (
        <>
        <hr className="mt-2 mb-2"></hr>
        <Link href={"/" + type}>
            <div className="text-sm italic hover:bg-slate-100">... (read more)
            </div>
        </Link>
        </>
        )
    }

    return (
    <div className="rounded-lg mb-6 p-6 ring-1 ring-slate-900/5 shadow-lg">
        <Link href={"/" + type}>
            <div className="hover:bg-slate-100">Recent {type}s ({total})</div>
        </Link>
        <hr className="mt-3 mb-2"></hr>
        <div>
            {recent_post_body}
            {readmore}
        </div>
    </div>
)}