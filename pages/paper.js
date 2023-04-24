import Layout from '../components/layout'
import PaperBlock from '../components/paper-block'
import { getSortedPostsData } from '../utils/post-data'

export default function Paper( {allpaper} ) {
    let year = "0000" // year
    let total = Object.keys(allpaper).length // total number of papers

    return (
        <Layout>
            <h1 class="text-3xl">Papers ({total})</h1>
            {allpaper.map(
                ( paper ) => {
                    let paper_year = paper["date"].slice(0, 4)
                    let is_year_heading = (paper_year !== year)

                    if (is_year_heading) {
                        year = paper_year
                    }

                    return (
                    <>
                        {is_year_heading ? (
                            <h1 class="text-center mt-10 font-mono text-rose-600">{">>" + year + "<<"}</h1>
                        ) : (
                            <></>)
                        }
                        <div class="group rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-slate-100">
                            <PaperBlock paper={paper}/>
                            <hr></hr>
                            <p class='text-xs text-slate-700 max-h-20 overflow-auto group-hover:max-h-full'>{paper["abstract"]}</p>
                        </div>
                    </>
            )})}
        </Layout>
    )
}

export async function getStaticProps() {
    const allpaper = getSortedPostsData('contents/paper')
    return {
        props: {
            allpaper,
        }
    }
}