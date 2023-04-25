import Link from 'next/link'
import Image from 'next/image'
import IconStack from '../components/icon-stack'

export default function BlogBlock ({post}) {
    const coverpath = '/cover/blog/' + post["id"] + '.png'

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
            <Link href="/">
                <Image src={coverpath} height={120} width={120} class="max-w-md"/>
            </Link>
            <div>
                <Link href="/">
                    <h3>{post["title"]}</h3>
                    <p class='text-xs text-slate-700'>{post["date"]}</p>
                </Link>
                <IconStack icon_links={icon_links}/>
            </div>
        </div>
    )
}