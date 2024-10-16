import Head from 'next/head'
import { Tweet } from 'react-tweet'
import Layout from '../../components/layout'
import BlogBlock from '../../components/post-block/blog-block'
import { getAllPostIds, getPostData } from '../../utils/post-data'

export default function NotePage({ post }) {
    // update date
    const update = (post.update != null) ? (
        <div className="italic mt-5 text-right">
            Lastly updated: <span>{post.update}</span>
        </div>
    ) : (
        <></>
    )

    // tweet id and comment
    const tweet_id = (post.link.x != null) ? (
        post.link.x.split('/').pop()
    ) : (
        null
    )

    const comment = (post.link.x != null) ? (
        <div>
            <hr className="mt-10 mb-5"/>
            <div className="italic">Do you have any ideas or comments? Please join the discussion on <a href={post.link.x}>X</a>👇</div>
            <Tweet id={tweet_id} />
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
                {comment}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
  const paths = getAllPostIds('contents/note')
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
    const post = await getPostData(params.id, 'contents/note')
    return {
        props: { post }
  }
}