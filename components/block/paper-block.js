import Link from 'next/link'
import Image from 'next/image'

export default function PaperBlock ({post, show_abstract=true}) {
    const coverpath = '/cover/paper/' + post["id"] + '.png'

    return (
        <Link href={post['doi']}>
            <div class="flex items-center space-x-4">
                <div>
                    <Image src={coverpath} height={120} width={120} class="max-w-md"/>
                </div>
                <div>
                    <div>{post["title"]}</div>
                    <div class='text-xs text-slate-700'>{post["author"]}</div>
                    <div class='text-xs text-slate-700'>{post["venue"]}, {post["date"]}</div>
                </div>
            </div>
            { show_abstract ? (
                        <>
                            <hr></hr>
                            <p class="text-sm line-clamp-4 overflow-auto group-hover:line-clamp-none">{post["abstract"]}</p>
                        </>
                    ) : (
                        <></>
                    )}
        </Link>
    )
}