export default function RecentPaper({ posts }) {
    return (
    <div class="rounded-lg mt-6 p-6 ring-1 ring-slate-900/5 shadow-lg space-y-3">
    <div class="flex items-center space-x-3">
        <a href="/paper">
            <h3>Recent papers</h3>
        </a>
        </div>
        <hr></hr>
        <ul role="list" class="marker:text-slate-400 list-disc pl-5 space-y-3">
            {posts.map(
                ({title, author, venue, date, doi}) => (
                <li class="hover:bg-slate-100">
                    <a href={doi}>
                        {title}
                        <p class='text-xs text-slate-500'>{author}</p>
                        <p class='text-xs text-slate-500'>{venue}, {date}</p>
                    </a>
                </li>
            ))}
        </ul>
    </div>
)}