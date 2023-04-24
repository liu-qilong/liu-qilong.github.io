export default function RecentPaper({ posts, maxnum }) {
    let num = 0 // idx of a paper
    let total = Object.keys(posts).length // total number of papers

    return (
    <div class="rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3">
    <div class="flex items-center space-x-3">
        <a href="/paper">
            <h3>Recent papers ({total})</h3>
        </a>
        </div>
        <hr></hr>
        <ul role="list" class="marker:text-slate-400 list-disc pl-5 space-y-3">
            {posts.map(
                ({title, author, venue, date, doi}) => {
                    num = num + 1
                    if (num <= maxnum) {
                        return (
                            <li class="hover:bg-slate-100">
                                <a href={doi}>
                                    {title}
                                    <p class='text-xs text-slate-700'>{author}</p>
                                    <p class='text-xs text-slate-700'>{venue}, {date}</p>
                                </a>
                            </li>
                        )
                    }
            })}
            {(num > maxnum) ? (<li class="italic">.... <a href="/paper">(read more)</a></li>) : (<></>)}
        </ul>
    </div>
)}