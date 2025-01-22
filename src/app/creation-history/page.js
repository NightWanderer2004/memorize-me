'use client'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Home() {
   return (
      <main className='container max-w-3xl mx-auto px-[16px] pt-8'>
         <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: 'backOut', duration: 0.55 }}>
            <motion.div
               className='inline-block'
               whileTap={{ scale: 0.97 }}
               transition={{
                  ease: 'backOut',
                  duration: 0.55,
               }}
            >
               <Link href='/albums' className='flex items-center gap-1 text-accent'>
                  <ArrowLeft className='size-4 stroke-[2.5px]' />{' '}
                  <span className='text-xl lg:text-[18px] font-normal tracking-[-1.5%] leading-[75%]'>Back to Gallery</span>
               </Link>
            </motion.div>
         </motion.header>
         <AnimatedWrapper>
            <p className='mx-auto text-lg mt-[90px]'>
               Hi-Hi ヽ(°〇°)ﾉ <br /> <br /> This app was created by the reason of study project
            </p>
         </AnimatedWrapper>
      </main>
   )
}
