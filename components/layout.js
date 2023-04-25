import Link from 'next/link'
import Image from 'next/image'
import IconStack from '../components/icon-stack'
import React, { useState } from 'react'

export default function Layout({ children }) {
    const [name, setName] = useState('QILONG ')
    const [imglink, setImgLink] = useState('/profile/kirov.jpg')

    return (
        <div class="flex m-10 divide-x">
            <div class="basis-1/3 text-center pl-20 pt-5">
                <div class="group"
                    onMouseEnter = {() => {
                        setName('KIROV🪐')
                        setImgLink('/profile/knpob.png')
                    }} 
                    onMouseLeave = {() => {
                        setName('QILONG ')
                        setImgLink('/profile/kirov.jpg')
                    }}>
                    <div class="group font-mono font-semibold text-3xl p-5">
                        <span class="group-hover:text-rose-700">{name}</span>LIU
                    </div>
                    <Image priority src={imglink} className="rounded-full mx-auto" height={150} width={150}/>
                </div>
                <IconStack divclass="flex container items-center pl-10 pr-10 pt-5" imgclass="mx-auto" size="30" icon_links={[
                    ['google-scholar', 'https://scholar.google.com/citations?user=N2-7ArsAAAAJ&hl=en'],
                    ['github', 'https://github.com/TOB-KNPOB'],
                    ['medium', 'https://medium.com/@dafaddadaedddd'],
                    ['twitter', 'https://twitter.com/liu_qi_long'],
                    ['hugging-face', 'https://huggingface.co/TOB-KNPOB'],
                ]}/>
                <Link class="text-s" href="qilong-kirov.liu@connect.polyu.hk">qilong-kirov.liu@connect.polyu.hk</Link>
                
                <div>
                    {[
                        ['Home', '/'],
                        ['Papers', '/paper'],
                        ['Projects', '/project'],
                        ['Blogs', '/blog'],
                    ].map(([title, url]) => (
                        <div class="m-5">
                            <Link class="text-slate-800 text-lg" href={url}>{title}</Link>
                        </div>
                    ))}
                </div>
            </div>
            <div class="basis-2/3 p-10 pl-20">
                {children}
            </div>
        </div>
    )
  }