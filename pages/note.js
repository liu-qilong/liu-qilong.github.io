import Head from 'next/head'
import PostIndex from '../components/post-index'
import { getSortedPostsData } from '../utils/post-data'

export default function Post( {allnote} ) {
    return (
        <>
        <Head>
            <title>Notes</title>
        </Head>
        <PostIndex type='note' allpost={allnote}/>
        </>
    )
}

export async function getStaticProps() {
    const allnote = getSortedPostsData('contents/note', false)
    return {
        props: {
            allnote,
        }
    }
}