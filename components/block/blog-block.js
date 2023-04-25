import Link from 'next/link'
import Image from 'next/image'
import IconStack from '../icon-stack'

export default function BlogBlock ({post, divclass="flex items-center space-x-4", titleclass="", dateclass="text-xs text-slate-700", imgsize=120}) {
    const coverpath = '/cover/blog/' + post["id"] + '.png'

    // post link
    let post_link = "blog/" + post["id"]

    // generate icon links list for icon stack
    let icon_links = []

    if (post["link"] != null) {
        const link_keys = Object.keys(post["link"])
        icon_links = link_keys.map( ( key ) => {
            return [ key, post['link'][key]]
        })
    }

    console.log(post)
    console.log(post["link"])

    return (
        <div class={divclass}>
            <Link href={post_link}>
                <Image src={coverpath} height={imgsize} width={imgsize} class="max-w-md"/>
            </Link>
            <div>
                <Link href={post_link}>
                    <div class={titleclass}>{post["title"]}</div>
                    <div class={dateclass}>{post["date"]}</div>
                </Link>
                <IconStack icon_links={icon_links}/>
            </div>
        </div>
    )
}