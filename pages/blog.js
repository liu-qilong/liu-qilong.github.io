import Head from 'next/head'
import PostIndex from '../components/post-index'
import { getSortedPostsData } from '../utils/post-data'

export default function Post( {allblog} ) {
    return (
        <>
        <Head>
            <title>Blogs</title>
            <PostIndex type='blog' allpost={allblog}/>
        </Head>
    </>
    )
}

export async function getStaticProps() {
    const allblog = getSortedPostsData('contents/blog')
    return {
        props: {
            allblog,
        }
    }
}