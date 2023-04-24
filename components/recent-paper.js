import Link from 'next/link'
import PaperBlock from '../components/paper-block'

export default function RecentPaper({ posts, maxnum }) {
    let num = 0 // idx of a paper
    let total = Object.keys(posts).length // total number of papers

    return (
    <div class="rounded-lg p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3">
    <div class="flex items-center space-x-3">
        <Link href="/paper">
            <h3>Recent papers ({total})</h3>
        </Link>
        </div>
        <hr></hr>
        <ul role="list" class="marker:text-slate-400 pl-5 space-y-3">
            {posts.map(
                (paper) => {
                    num = num + 1
                    const coverpath = '/cover/paper/' + paper["id"] + '.png'

                    if (num <= maxnum) {
                        return (
                            <li class="hover:bg-slate-100">
                                 <PaperBlock paper={paper}/>
                            </li>
                        )
                    }
            })}
            {(num > maxnum) ? (<li class="italic">.... <Link href="/paper">(read more)</Link></li>) : (<></>)}
        </ul>
    </div>
)}