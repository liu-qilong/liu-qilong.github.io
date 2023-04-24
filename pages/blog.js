import PostIndex from '../components/post-index'
import { getSortedPostsData } from '../utils/post-data'

export default function Post( {allblog} ) {
    return (
        <PostIndex type='blog' allpost={allblog}/>
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