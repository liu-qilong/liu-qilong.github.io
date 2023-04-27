import Link from 'next/link'
import Image from 'next/image'

export default function PaperBlock ({post, show_abstract=false, divclass="flex flex-col md:flex-row items-center", titleclass="text-sm md:text-base mb-2 md:mb-1", dateclass="text-xs text-slate-700", imgsize=120}) {
    const coverpath = '/cover/paper/' + post["id"] + '.png'
    
    const abstract = (show_abstract) ? (
        <>
        <hr className="mt-2 mb-2"></hr>
        <p className="text-xs md:text-sm text-slate-700 line-clamp-4 overflow-auto group-hover:line-clamp-none">{post["abstract"]}</p>
        </>
    ) : (
        <></>
    )

    return (
        <Link href={post['doi']}>
            <div className={divclass}>
                <div>
                    <Image src={coverpath} height={imgsize} width={imgsize} className="mx-auto" alt=""/>
                </div>
                <div className="md:ml-3">
                    <div className={titleclass}>{post["title"]}</div>
                    <div className={dateclass}>{post["author"]}</div>
                    <div className={dateclass}>{post["venue"]}, {post["date"]}</div>
                </div>
            </div>
            {abstract}
        </Link>
    )
}