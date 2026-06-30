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
            <p>Welcome to my blog site! I am a PhD student at <Link href="https://www.polyu.edu.hk/en/">The Hong Kong Polytechnic University</Link> and <Link href="https://www.aidlab.hk/en/">AiDLab (Laboratory for Artificial Intelligence in Design)</Link>. My research interests include 3D vision 👀 (shape matching, generation and representation learning on 3D shapes/manifolds) and AI4Design 👾.</p>

            <br></br>
            <RecentPost type='paper' posts={allpaper} maxnum={10}/>
            {/* <RecentPost type='blog' posts={allblog} maxnum={3}/> */}
            {/* <RecentPost type='note' posts={allnote} maxnum={3}/> */}
            {/* <RecentPost type='project' posts={allproject} maxnum={3}/> */}
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
