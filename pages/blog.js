import Head from 'next/head'
import PostIndex from '../components/post-index'
import { getSortedPostsData } from '../utils/post-data'

export default function Post( {allblog} ) {
    return (
        <>
        <Head>
            <title>Blogs</title>
        </Head>
        <PostIndex type='blog' allpost={allblog}/>
        </>
    )
}

export async function getStaticProps() {
    const allblog = getSortedPostsData('contents/blog', false)
    return {
        props: {
            allblog,
        }
    }
}