import Layout from '../components/layout'
import RecentPaper from '../components/recent-paper'
import { getSortedPostsData } from '../utils/post-data'

export default function Home( {allpaper, allproject, allblog} ) {
    return (
        <Layout>
            <p class="first-letter:text-5xl first-letter:font-semibold first-letter:float-left first-letter:mr-3">
                Hello👋 welcome to my blog site! I am an MPhil student at <a href="https://www.polyu.edu.hk/en/">The Hong Kong Polytechnic University</a>. I am thrilled with exploring new ideas💡 and hopefully my effort can contribute to our community🌍
            </p>
            
            <br></br>

            <RecentPaper posts={allpaper}></RecentPaper>

        </Layout>
    )
}

export async function getStaticProps() {
    const allpaper = getSortedPostsData('contents/paper')
    const allproject = getSortedPostsData('contents/project')
    const allblog = getSortedPostsData('contents/blog')
    return {
        props: {
            allpaper,
            allproject,
            allblog,
        }
    }
}