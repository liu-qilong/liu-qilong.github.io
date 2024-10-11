import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout'
import RecentPost from '../components/recent-post'
import { getSortedPostsData } from '../utils/post-data'

export default function Home( {allpaper, allproject, allblog, allnote} ) {
    return (
        <>
        <Head>
            <title>Home</title>
        </Head>
        <Layout>
            <h2>Hello 👋</h2>
            <p>Welcome to my blog site! I am an MPhil student at <Link href="https://www.polyu.edu.hk/en/">The Hong Kong Polytechnic University</Link> and <Link href="https://www.aidlab.hk/en/">AiDLab (Laboratory for Artificial Intelligence in Design)</Link>. I am thrilled with exploring new ideas 💡 and hopefully my effort can contribute to our community 🌍</p>

            <br></br>
            <RecentPost type='paper' posts={allpaper} maxnum={3}/>
            <RecentPost type='blog' posts={allblog} maxnum={3}/>
            <RecentPost type='note' posts={allnote} maxnum={3}/>
            <RecentPost type='project' posts={allproject} maxnum={3}/>
        </Layout>
        </>
    )
}

export async function getStaticProps() {
    const allpaper = getSortedPostsData('contents/paper')
    const allproject = getSortedPostsData('contents/project')
    const allblog = getSortedPostsData('contents/blog')
    const allnote = getSortedPostsData('contents/note')

    return {
        props: {
            allpaper,
            allproject,
            allblog,
            allnote,
        }
    }
}