'use client'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
   return (
      <main className='container mx-auto px-[16px] lg:px-[88px]'>
         <header>
            <motion.div
               className='inline-block'
               whileTap={{ scale: 0.97 }}
               transition={{
                  ease: 'backOut',
                  duration: 0.55,
               }}
            >
               <Link href='/' className='flex items-center gap-1 text-accent'>
                  <ArrowLeft className='size-4 stroke-[2.5px]' />{' '}
                  <span className='text-xl lg:text-[18px] font-normal tracking-[-1.5%] leading-[75%]'>Back to Gallery</span>
               </Link>
            </motion.div>
         </header>
         <AnimatedWrapper>
            <p className='max-w-4xl mx-auto text-lg px-[16px] lg:px-[88px] mt-[115px]'>
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nobis ab sit rem totam neque. Quasi repellendus placeat dolorum itaque
               non impedit consequuntur officia illum error rem, similique dolores suscipit.
            </p>
         </AnimatedWrapper>
      </main>
   )
}
