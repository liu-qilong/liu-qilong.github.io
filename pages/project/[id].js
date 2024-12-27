import Head from 'next/head'
import Layout from '../../components/layout'
import ProjectBlock from '../../components/post-block/project-block'
import { getAllPostIds, getPostData } from '../../utils/post-data'

export default function ProjectPage({ post }) {
    const update = (post.update != null) ? (
        <div className="italic mt-5 text-right">
            Lastly updated: <span>{post["update"]}</span>
        </div>
    ) : (
        <></>
    )

    return (
        <Layout>
            <Head>
                <title>{post.title}</title>
                <meta property="twitter:card" content="summary"/>
                <meta property="twitter:site" content="@liu_qi_long"/>
                <meta property="twitter:title" content={post.title}/>
                <meta property="twitter:image" content={post.coverpath}/>
            </Head>
            <div>
                <ProjectBlock post={post} titleclass="text-2xl md:text-3xl font-medium text-slate-700" dateclass="font-mono text-sm" imgsize="150"/>
                <hr className="mt-5"></hr>
                <div dangerouslySetInnerHTML={{ __html: post.content }}/>
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
    const post = await getPostData(params.id, 'contents/project')
    return {
        props: { post }
  }
}