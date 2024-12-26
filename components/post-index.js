import Layout from '../components/layout'
import PaperBlock from './post-block/paper-block'
import ProjectBlock from './post-block/project-block'
import BlogBlock from './post-block/blog-block'
import NoteBlock from './post-block/note-block'

export default function PostIndex( {type, allpost} ) {
    let year = "0000" // year
    let total = Object.keys(allpost).length // total number of papers

    var BlockDict = {
        "paper": PaperBlock,
        "project": ProjectBlock,
        "blog": BlogBlock,
        "note": NoteBlock,
    }
    let BlockType = BlockDict[type]

    // generate index page body
    const index_body = allpost.map(
        ( post ) => {
            try {
                let post_year = post.date.slice(0, 4)
                let year_heading = (<></>)

                if (post_year !== year) {
                    year = post_year
                    year_heading = (
                        <div className="text-center mt-10 font-mono text-rose-700">{">>" + year + "<<"}</div>
                    )
                }

                // generate post block
                let post_block = <BlockType post={post} show_abstract={true} key={post.id}/>

                return (
                    <div key={type + year}>
                        {year_heading}
                        <div className="group rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-slate-100">
                        {post_block}
                        </div>
                    </div>
                )
            } catch (err) {
                console.error(err)
                console.log(post)
            }
        }
    )

    return (
        <Layout>
            <h2>{type.slice(0, 1).toUpperCase() + type.slice(1, )}s ({total})</h2>
            {index_body}
        </Layout>
    )
}