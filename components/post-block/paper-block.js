import Link from 'next/link'
import Image from 'next/image'

export default function PaperBlock ({post, show_abstract=false, show_doi=false, link=false, divclass="flex flex-col md:flex-row items-center", titleclass="text-sm md:text-base mb-2 md:mb-1", abstract_class="text-xs md:text-sm text-slate-700 line-clamp-5", dateclass="text-xs text-slate-700", imgsize=120}) {
    const coverpath = '/cover/paper/' + post.id + '.png'
    
    const abstract = (show_abstract) ? (
        <>
        <hr className="mt-2 mb-2"></hr>
        <p className={abstract_class}>{post.abstract}</p>
        </>
    ) : (
        <></>
    )

    const doi = (show_doi) ? (
        <>
        <hr className="mt-2 mb-2"></hr>
        <p className={abstract_class}>DOI: {post.doi}</p>
        </>
    ) : (
        <></>
    )

    const post_link = (show_doi) ? (post.doi) : ("paper/" + post.id)

    return (
        <Link href={post_link}>
            <div className={divclass}>
                <div>
                    <Image src={coverpath} height={imgsize} width={imgsize} className="mx-auto" alt=""/>
                </div>
                <div className="md:ml-3">
                    <div className={titleclass}>{post.title}</div>
                    <div className={dateclass}>{post.author}</div>
                    <div className={dateclass}>{post.venue}, {post.date}</div>
                </div>
            </div>
            {abstract}
            {doi}
        </Link>
    )
}