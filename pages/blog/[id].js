import Head from 'next/head'
import Layout from '../../components/layout'
import BlogBlock from '../../components/post-block/blog-block'
import { getAllPostIds, getPostData } from '../../utils/post-data'

export default function BlogPage({ postData }) {
    const update = (postData.update != null) ? (
        <div className="italic mt-5 text-right">
            Lastly updated: <span>{postData.update}</span>
        </div>
    ) : (
        <></>
    )

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
                <meta property="twitter:card" content="summary"/>
                <meta property="twitter:site" content="@liu_qi_long"/>
                <meta property="twitter:title" content={postData.title}/>
                <meta property="twitter:image" content={`https://qilong-liu.vercel.app/cover/blog/${postData.id}.png`}/>
            </Head>
            <div>
                <BlogBlock post={postData} titleclass="text-2xl md:text-3xl font-medium text-slate-700" dateclass="font-mono text-sm" imgsize="150"/>
                <hr className="mt-5"></hr>
                <div dangerouslySetInnerHTML={{ __html: postData.content }}/>
                {update}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
  const paths = getAllPostIds('contents/blog')
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id, 'contents/blog')
    return {
        props: {
        postData
    }
  }
}