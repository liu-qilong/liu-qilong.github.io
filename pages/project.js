import PostIndex from '../components/post-index'
import { getSortedPostsData } from '../utils/post-data'

export default function Post( {allproject} ) {
    return (
        <PostIndex type='project' allpost={allproject}/>
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