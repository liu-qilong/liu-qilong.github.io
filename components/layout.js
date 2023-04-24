import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'

export default function Layout({ children }) {
    const [name, setName] = useState('qilong')
    const [imglink, setImgLink] = useState('/img/kirov.jpg')

    return (
        <div class="flex m-10 divide-x">
            <div class="basis-1/3 text-center pl-20 pt-5">
                <div class="group"
                    onMouseEnter = {() => {
                        setName('kirov')
                        setImgLink('/img/knpob.png')
                    }} 
                    onMouseLeave = {() => {
                        setName('qilong')
                        setImgLink('/img/kirov.jpg')
                    }}>
                    <div class="group font-mono font-semibold text-3xl p-5">
                        <span class="group-hover:text-sky-700">{name}</span> liu
                    </div>
                    <Image priority src={imglink} className="rounded-full mx-auto" height={150} width={150}/>
                </div>
                <div class="flex container pl-20 pr-20 pt-5">
                    <Link class="mx-auto" href="/">
                        <span class="text-xl text-black">CV</span>
                    </Link>
                    {[
                        ['/img/github.png', 'https://github.com/TOB-KNPOB'],
                        ['/img/google.png', 'https://scholar.google.com/citations?user=N2-7ArsAAAAJ&hl=en'],
                        ['/img/twitter.png', 'https://twitter.com/liu_qi_long'],
                    ].map(([img, url]) => (
                        <Link class="mx-auto" href={url}>
                            <Image priority src={img} className="rounded-full" height={30} width={30}/>
                        </Link>
                    ))}
                </div>
                <Link class="text-sm" href="qilong-kirov.liu@connect.polyu.hk">qilong-kirov.liu@connect.polyu.hk</Link>
                <div>
                    {[
                        ['Home', '/'],
                        ['Paper', '/paper'],
                        ['Project', '/project'],
                        ['Blog', '/blog'],
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