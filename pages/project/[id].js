import Head from 'next/head'
import Layout from '../../components/layout'
import ProjectBlock from '../../components/post-block/project-block'
import { getAllPostIds, getPostData } from '../../utils/post-data'

export default function ProjectPage({ postData }) {
    let update = (<>nothing</>)

    if (postData.update != null) {
        update = (
            <div className="italic mt-5 text-right">
                Lastly updated: <span>{postData["update"]}</span>
            </div>
        )
    }

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div>
                <ProjectBlock post={postData} titleclass="text-2xl md:text-3xl font-medium text-slate-700" dateclass="font-mono text-sm" imgsize="150"/>
                <hr className="mt-5"></hr>
                <div dangerouslySetInnerHTML={{ __html: postData.content }}/>
            </div>
            {update}
        </Layout>
    )
}

export async function getStaticPaths() {
  const paths = getAllPostIds('contents/project')
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id, 'contents/project')
    return {
        props: {
        postData
    }
  }
}