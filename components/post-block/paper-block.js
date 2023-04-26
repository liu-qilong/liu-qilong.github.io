import Link from 'next/link'
import Image from 'next/image'

export default function PaperBlock ({post, show_abstract=false, divclass="flex flex-col md:flex-row items-center", titleclass="text-sm md:text-base mb-1", dateclass="text-xs text-slate-700", imgsize=120}) {
    const coverpath = '/cover/paper/' + post["id"] + '.png'

    return (
        <Link href={post['doi']}>
            <div class={divclass}>
                <div>
                    <Image src={coverpath} height={imgsize} width={imgsize} class="mx-auto"/>
                </div>
                <div class="md:ml-2">
                    <div class={titleclass}>{post["title"]}</div>
                    <div class={dateclass}>{post["author"]}</div>
                    <div class={dateclass}>{post["venue"]}, {post["date"]}</div>
                </div>
            </div>
            { show_abstract ? (
                <>
                <hr class="mt-2 mb-2"></hr>
                <p class="text-xs md:text-sm text-slate-700 line-clamp-4 overflow-auto group-hover:line-clamp-none">{post["abstract"]}</p>
                </>
            ) : (
                <></>
            )}
        </Link>
    )
}