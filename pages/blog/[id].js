import Head from 'next/head'
import Layout from '../../components/layout'
import BlogBlock from '../../components/block/blog-block'
import { getAllPostIds, getPostData } from '../../utils/post-data'

export default function BlogPage({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div>
                <BlogBlock post={postData} titleclass="text-3xl font-medium text-slate-700" dateclass="font-mono" imgsize="150"/>
                <hr class="mt-5"></hr>
                <div dangerouslySetInnerHTML={{ __html: postData.content }}/>
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
    const postData = await getPostData(params.id, 'contents/blog');
    return {
        props: {
        postData
    }
  }
}