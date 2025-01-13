'use client'

import AnimatedWrapper from '@/components/AnimatedWrapper'
import Header from '@/components/Header'

export default function Home() {
   return (
      <main>
         <Header />
         <AnimatedWrapper>
            <p className='container mx-auto max-w-4xl text-lg px-[16px] lg:px-[88px] mt-12'>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nobis ab sit rem totam neque. Quasi repellendus placeat dolorum itaque
               non impedit consequuntur officia illum error rem, similique dolores suscipit.
            </p>
         </AnimatedWrapper>
      </main>
   )
}
