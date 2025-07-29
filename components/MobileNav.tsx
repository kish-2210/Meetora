"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet"

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[232px]'>

            <Sheet>
                <SheetTrigger asChild>
                    <Image
                        src="/icons/hamburger.svg"
                        width={36}
                        height={36}
                        alt='hamburger icon'
                        className='cursor-pointer sm:hidden ml-5'
                    />
                </SheetTrigger>
                <SheetContent side='left' className='border-none bg-sidebar pt-5 pl-5 text-white'>
                    <Link href="/" className='flex items-center gap-1'>
                        <Image
                            src="/icons/logo.svg"
                            width={32}
                            height={32}
                            alt='meetora logo'
                            className='max-sm:size-10'
                        />
                        <p className='text-[26px] font-extrabold text-white'>Meetora</p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        
                            <section className='flex h-full flex-col gap-6 pt-10 text-white '>
                                {sidebarLinks.map((link) => {
                                    const isActive = (pathname === link.route)
                                    return (
                                        <SheetClose asChild key={link.label}>
                                        <Link
                                            href={link.route}
                                            key={link.label}
                                            className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                                                'bg-button-1': isActive,
                                            })}>
                                            <Image src={isActive?link.imgUrl2:link.imgUrl} alt={link.label} width={20} height={20} />
                                            <p className= {`${isActive ? 'text-button-2' : 'text-button-1'} font-semibold`}>
                                                {link.label}
                                            </p>
                                        </Link>
                                        </SheetClose>
                                    )
                                })}
                            </section>
                        
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav
