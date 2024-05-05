import { UserButton, SignedIn } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

const Navbar = () => {
  return (
    <header className='shadow text-slate-300 bg-slate-800 rounded border border-slate-600'>
      <div className='max-w-full mx-auto h-14 p-4 flex itmes-center justify-between font-medium'>
        <Link href={'/'}>
          <span className='font-bold bg-slate-700 hover:bg-blue-400 p-2 rounded'>eSITESERVER</span>
        </Link>
        <Link href={'/zoom'} className={cn('')}>
            <span className='font-bold bg-slate-700 hover:bg-blue-400 p-2 rounded'>New Meeting</span>
        </Link>
        <SignedIn>
          <div className='flex items-center gap-5'>
              <Link href={'/zoom/meetings'}>
                  <span className='font-bold bg-slate-700 hover:bg-blue-400 p-2 rounded'>Meetings</span>
              </Link>
              <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  )
}

export default Navbar
