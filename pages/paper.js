import { Inter } from 'next/font/google'
import Layout from '../components/layout'
import { getSortedPostsData } from '../utils/post-data'

const inter = Inter({ subsets: ['latin'] })

export default function Paper( {allpaper} ) {
    let year = "0000"

    return (
        <Layout>
            <h1 class="text-3xl">Papers</h1>
            {allpaper.map(
                ({title, author, venue, date, doi, abstract}) => {
                    let paper_year = date.slice(0, 4)
                    let is_year_heading = (paper_year !== year)

                    if (is_year_heading) {
                        year = paper_year
                    }

                    return (
                    <>
                        {is_year_heading ? (<h1 class="text-center mt-10 font-mono text-rose-600">{">>" + year + "<<"}</h1>) : (<p></p>)}

                        <a href={doi}>
                            <div class="rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-slate-100">
                                <h3>{title}</h3>
                                <p class='text-xs text-slate-500'>{author}</p>
                                <p class='text-xs text-slate-500'>{venue}, {date}</p>
                                <p class='text-xs text-slate-500 max-h-20 hover:max-h-full overflow-auto'>{abstract}</p>
                            </div>
                        </a>
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