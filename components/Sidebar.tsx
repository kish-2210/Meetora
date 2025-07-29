"use client"
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <section className='bg-navbar sticky left-0 top-0 flex h-screen w-fit flex-col justify-between p-6 pt-28 max-sm:hidden lg:w-[264px]'>
            <div className='flex flex-1 flex-col gap-6 '>
                {sidebarLinks.map((link) => {
                    const isActive = (pathname === link.route) || (pathname.startsWith(`${link.route}/`));
                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center p-4 rounded-lg justify-start ', {
                                'bg-button-1': isActive,
                            })}>
                            <Image src={isActive?link.imgUrl2:link.imgUrl} alt={link.label} width={24} height={24}  />
                            <p className={cn('text-lg text-button-1 font-semibold max-lg:hidden',{'text-button-2':isActive,})}>
                                {link.label}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}

export default Sidebar
