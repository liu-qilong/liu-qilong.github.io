import Link from 'next/link'
import Image from 'next/image'
import IconStack from '../icon-stack'

export default function ProjectBlock ({post}) {
    const coverpath = '/cover/project/' + post["id"] + '.png'

    // post link
    let post_link = "project/" + post["id"]

    // generate icon links list for icon stack
    let icon_links = []

    if (post["link"] != null) {
        const link_keys = Object.keys(post["link"])
        icon_links = link_keys.map( ( key ) => {
            return [ key, post['link'][key]]
        })
    }

    return (
            <div class="flex items-center space-x-4">
                <Link href={post_link}>
                    <Image src={coverpath} height={120} width={120} class="max-w-md"/>
                </Link>
                <div>
                    <Link href={post_link}>
                        <div>{post["title"]}</div>
                        <div class='text-xs text-slate-700'>{post["date"]}</div>
                    </Link>
                    <IconStack icon_links={icon_links}/>
                </div>
            </div>
    )
}