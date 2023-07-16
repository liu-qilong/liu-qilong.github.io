import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../utils/post-data'
import PaperBlock from '../../components/post-block/paper-block'

export default function PaperPage({ postData }) {

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <div>
                <div className="group rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-slate-100">
                    <PaperBlock post={postData} show_abstract={true} show_doi={true} abstract_class="text-xs md:text-sm text-slate-700"/>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.content }}/>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
  const paths = getAllPostIds('contents/paper')
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id, 'contents/paper')
    return {
        props: {
        postData
    }
  }
}