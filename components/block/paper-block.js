import Link from 'next/link'
import Image from 'next/image'

export default function PaperBlock ({post}) {
    const coverpath = '/cover/paper/' + post["id"] + '.png'

    return (
        <Link href={post['doi']}>
            <div class="flex items-center space-x-4">
                <div>
                    <Image src={coverpath} height={120} width={120} class="max-w-md"/>
                </div>
                <div>
                    <h3>{post["title"]}</h3>
                    <div class='text-xs text-slate-700'>{post["author"]}</div>
                    <div class='text-xs text-slate-700'>{post["venue"]}, {post["date"]}</div>
                </div>
            </div>
        </Link>
    )
}