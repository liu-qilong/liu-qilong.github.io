import Layout from '../components/layout'
import PaperBlock from './block/paper-block'
import ProjectBlock from './block/project-block'
import BlogBlock from './block/blog-block'

export default function PostIndex( {type, allpost} ) {
    let year = "0000" // year
    let total = Object.keys(allpost).length // total number of papers

    var BlockDict = {
        "paper": PaperBlock,
        "project": ProjectBlock,
        "blog": BlogBlock,
    }
    let BlockType = BlockDict[type]

    return (
        <Layout>
            <h1 class="text-3xl first-letter:uppercase">{type}s ({total})</h1>
            {allpost.map(
                ( post ) => {
                    let post_year = post["date"].slice(0, 4)
                    let is_year_heading = (post_year !== year)

                    if (is_year_heading) {
                        year = post_year
                    }

                    return (
                    <>
                        {is_year_heading ? (
                            <h1 class="text-center mt-10 font-mono text-rose-600">{">>" + year + "<<"}</h1>
                        ) : (
                            <></>)
                        }
                        <div class="group rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-slate-100">
                            <BlockType post={post}/>
                            {(type == "paper") ? (
                                <>
                                    <hr></hr>
                                    <p class="text-sm max-h-20 overflow-auto group-hover:max-h-full">{post["abstract"]}</p>
                                </>
                            ) : (
                                <></>
                            )}
                        </div>
                    </>
            )})}
        </Layout>
    )
}