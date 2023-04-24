import Link from 'next/link'
import Image from 'next/image'

export default function PaperBlock ({paper}) {
    const coverpath = '/cover/paper/' + paper["id"] + '.png'

    return (
        <Link href="{paper['doi']}">
            
                <div class="flex items-center space-x-4">
                    <div>
                        <Image src={coverpath} height={120} width={120} class="max-w-md"/>
                    </div>
                    <div>
                        <h3>{paper["title"]}</h3>
                        <p class='text-xs text-slate-700'>{paper["author"]}</p>
                        <p class='text-xs text-slate-700'>{paper["venue"]}, {paper["date"]}</p>
                    </div>
                </div>
        </Link>
    )
}