import Link from 'next/link'
import Image from 'next/image'
import IconStack from '../icon-stack'

export default function ProjectBlock ({post, show_abstract=false, divclass="flex flex-col md:flex-row items-center", titleclass="text-sm md:text-base mb-1", abstract_class="text-xs md:text-sm text-slate-700 line-clamp-5", dateclass="text-xs text-slate-700", imgsize=120}) {
    const coverpath = '/cover/project/' + post.id + '.png'

    const abstract = (show_abstract) ? (
        <>
        <hr className="mt-2 mb-2 text-slate-700"></hr>
        <p className={abstract_class}>{post.text}</p>
        </>
    ) : (
        <></>
    )

    // post link
    let post_link = "project/" + post.id

    // generate icon links list for icon stack
    let icon_links = []

    if (post.link != null) {
        const link_keys = Object.keys(post.link)
        icon_links = link_keys.map( ( key ) => {
            return [ key, post.link[key]]
        })
    }

    return (
        <div>
            <div className={divclass}>
                <Link href={post_link}>
                    <Image src={coverpath} height={imgsize} width={imgsize} className="mx-auto basis-1/5" alt=""/>
                </Link>
                <div className="md:ml-2 basis-1/5">
                    <Link href={post_link}>
                        <div className={titleclass}>{post.title}</div>
                        <div className={dateclass}>{post.date}</div>
                    </Link>
                    <IconStack icon_links={icon_links}/>
                </div>
            </div>
            <Link href={post_link}>
                {abstract}
            </Link>
        </div>
    )
}