import Head from 'next/head'
import PostIndex from '../components/post-index'
import { getSortedPostsData } from '../utils/post-data'

export default function Post( {allproject} ) {
    return (
        <>
        <Head>
            <title>Projects</title>
        </Head>
        <PostIndex type='project' allpost={allproject}/>
        </>
    )
}

export async function getStaticProps() {
    const allproject = getSortedPostsData('contents/project')
    return {
        props: {
            allproject,
        }
    }
}