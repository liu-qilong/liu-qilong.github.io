import Head from 'next/head'
import PostIndex from '../components/post-index'
import { getSortedPostsData } from '../utils/post-data'

export default function Post( {allpaper} ) {
    return (
        <>
        <Head>
            <title>Papers</title>
        </Head>
        <PostIndex type='paper' allpost={allpaper}/>
        </>
    )
}

export async function getStaticProps() {
    const allpaper = getSortedPostsData('contents/paper', flase)
    return {
        props: {
            allpaper,
        }
    }
}