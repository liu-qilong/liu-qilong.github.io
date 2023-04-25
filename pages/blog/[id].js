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
            <div class="max-w-xl">
                <BlogBlock post={postData} titleclass="text-3xl font-mono font-semibold text-slate-800" dateclass="font-mono" imgsize="120"/>
                <hr class="mt-5"></hr>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
        </Layout>
    );
  }

/* 
            <div class="shadow rounded-xl p-10">
                <h1 >{postData.title}</h1>
                <div >
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                </div>

*/

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