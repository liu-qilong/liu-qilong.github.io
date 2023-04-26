import Layout from '../components/layout'
import PaperBlock from './post-block/paper-block'
import ProjectBlock from './post-block/project-block'
import BlogBlock from './post-block/blog-block'

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
            <h2>{type.slice(0, 1).toUpperCase() + type.slice(1, )}s ({total})</h2>
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
                            <h1 className="text-center mt-10 font-mono text-rose-600">{">>" + year + "<<"}</h1>
                        ) : (
                            <></>)
                        }
                        <div className="group rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-slate-100">
                            {(type == "paper") ? (
                                <BlockType post={post} show_abstract={true}/>
                            ) : (
                                <BlockType post={post}/>
                            )}
                        </div>
                    </>
            )})}
        </Layout>
    )
}