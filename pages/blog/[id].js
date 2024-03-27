import Head from 'next/head'
import Layout from '../../components/layout'
import BlogBlock from '../../components/post-block/blog-block'
import { getAllPostIds, getPostData } from '../../utils/post-data'

export default function BlogPage({ post }) {
    const update = (post.update != null) ? (
        <div className="italic mt-5 text-right">
            Lastly updated: <span>{post.update}</span>
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
                <meta property="twitter:image" content={`https://qilong-liu.vercel.app${post.coverpath}`}/>
            </Head>
            <div>
                <BlogBlock post={post} titleclass="text-2xl md:text-3xl font-medium text-slate-700" dateclass="font-mono text-sm" imgsize="150"/>
                <hr className="mt-5"></hr>
                <div dangerouslySetInnerHTML={{ __html: post.content }}/>
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
    const post = await getPostData(params.id, 'contents/blog')
    return {
        props: { post }
  }
}