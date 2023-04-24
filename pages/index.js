import Layout from '../components/layout'
import { getSortedPostsData } from '../utils/post-data'

export default function Home( {allPostsData} ) {
    return (
        <Layout>
            <p class="font-serif first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3">
                Hello👋 welcome to my blog site! I am an MPhil student at <a href="https://www.polyu.edu.hk/en/">The Hong Kong Polytechnic University</a>. I am thrilled with exploring new ideas💡 and hopefully my effort can contribute to our community🌍
            </p>
            
            <br></br>

            <div class="rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3">
                <div class="flex items-center space-x-3">
                    <h3 class="font-serif">Recent papers</h3>
                </div>
                <hr></hr>
                <ul role="list" class="marker:text-slate-400 list-disc pl-5 space-y-3 font-serif">
                    {allPostsData.map(
                        ({id, title, author, venue, date}) => (
                        <li class="hover:bg-slate-100">{title}
                            <p class='text-xs text-slate-500'>{author}</p>
                            <p class='text-xs text-slate-500'>{venue}, {date}</p>
                        </li>
                    ))
                    }
                </ul>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData('contents/paper')
    return {
        props: {
            allPostsData
        }
    }
}