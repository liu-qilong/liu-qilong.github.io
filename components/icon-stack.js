import Link from 'next/link'
import Image from 'next/image'

export default function IconStack( {icon_links, size=20, divclass="flex mt-1", imgclass=""} ) {
    return (
    <div className={divclass}>
        {icon_links.map( ( [icon, url] ) => (
            <Link className={imgclass} href={url}>
                <Image priority src={"/icon/" + icon + ".png"} height={size} width={size} alt=""/>
            </Link>
        ))}
    </div>)
}