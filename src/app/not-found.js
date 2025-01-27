'use client'

import AnimatedWrapper from '@/components/AnimatedWrapper'
import Link from 'next/link'

export default function NotFound() {
   return (
      <div className='pt-[180px] flex flex-col items-center justify-center container mx-auto max-w-5xl w-full'>
         <AnimatedWrapper>
            <div className='flex flex-col items-center justify-center gap-3'>
               <h1 className='text-4xl font-bold'>User does not exist</h1>
               <p className='text-lg text-gray-500'>Please check the URL and try again</p>
               <Link className='text-lg text-accent mt-4' href='/'>
                  Go back
               </Link>
            </div>
         </AnimatedWrapper>
      </div>
   )
}
