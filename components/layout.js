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
                    <div class="text-sm m-5">qilong-kirov.liu@connect.polyu.hk</div>
                </div>
                <div class="flex container px-10">
                    <a class="mx-auto" href="/">
                        <span class="text-xl text-black">CV</span>
                    </a>
                    {[
                        ['/img/github.png', 'https://github.com/TOB-KNPOB'],
                        ['/img/google.png', 'https://scholar.google.com/citations?user=N2-7ArsAAAAJ&hl=en'],
                        ['/img/twitter.png', 'https://twitter.com/liu_qi_long'],
                    ].map(([img, url]) => (
                        <a class="mx-auto" href={url}>
                            <Image priority src={img} className="rounded-full" height={30} width={30}/>
                        </a>
                    ))}
                </div>
                <div>
                    {[
                        ['Home', '/'],
                        ['Paper', '/paper'],
                        ['Project', '/project'],
                        ['Blog', '/blog'],
                    ].map(([title, url]) => (
                        <div class="m-5">
                            <a class="text-slate-700 text-lg hover:bg-slate-100" href={url}>{title}</a>
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