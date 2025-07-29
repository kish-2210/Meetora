import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full  pr-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1'>
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt='meetora logo'
          className='size-16 max-sm:size-10 max-lg:size-15 max-lg:ml-6'
        />
        <p className='text-[26px] max-lg:hidden text-white'>Meetora</p>
      </Link>

      <div className="flex-between pl-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>

    </nav>
  )
}

export default Navbar
