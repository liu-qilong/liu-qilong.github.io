import Link from 'next/link'
import Image from 'next/image'
import IconStack from './icon-stack'
import React, { useState } from 'react'

export default function SideBar({ children }) {
    const [name, setName] = useState('QILONG ')
    const [imglink, setImgLink] = useState('/profile/kirov.jpg')

    return (
        <>
            {/* name and image */}
            <div className="group"
                onMouseEnter = {() => {
                    setName('KIROV🪐')
                    setImgLink('/profile/knpob.png')
                }} 
                onMouseLeave = {() => {
                    setName('QILONG ')
                    setImgLink('/profile/kirov.jpg')
                }}>
                <div className="group font-mono text-slate-700 font-semibold text-2xl">
                    <span className="group-hover:text-rose-700">{name}</span>LIU
                </div>
                <Image priority src={imglink} className="rounded-full mx-auto m-5" height={150} width={150} alt=""/>
            </div>

            {/* email & links */}
            <IconStack divclass="flex mx-auto w-fit" imgclass="p-1" size="25" icon_links={[
                ['cv', 'https://liu-qilong.github.io/CV/static/cv.pdf'],
                ['google-scholar', 'https://scholar.google.com/citations?user=N2-7ArsAAAAJ&hl=en'],
                ['github', 'https://github.com/liu-qilong'],
                ['hugging-face', 'https://huggingface.co/liu-qilong'],
                ['medium', 'https://medium.com/@liu-qilong'],
                ['x', 'https://twitter.com/liu_qi_long'],
                ['rednote', 'https://www.xiaohongshu.com/user/profile/5c5f9656000000001a0254a3'],
            ]}/>
            <Link className="text-s hyphens-none" href="qi-long.liu@connect.polyu.hk">qi-long.liu@connect.polyu.hk</Link>

            {/* navigator */}
            <div>
                {[
                    ['Home ⛺️', '/'],
                    ['Papers 📜', '/paper'],
                    ['Blogs ✍️', '/blog'],
                    ['Notes 📖', '/note'],
                    ['Projects 🏗️', '/project'],
                ].map(([title, url]) => (
                    <div className="m-5" key={title + url}>
                        <Link className="text-slate-800 text-lg" href={url}>{title}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}