'use client'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Home() {
   const router = useRouter()
   return (
      <main className='container max-w-3xl mx-auto px-[16px] py-safe-offset-10'>
         <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ ease: 'backOut', duration: 0.55 }}>
            <motion.div
               className='inline-block'
               whileTap={{ scale: 0.97 }}
               transition={{
                  ease: 'backOut',
                  duration: 0.55,
               }}
            >
               <button onClick={() => router.back()} className='flex items-center gap-1 text-accent'>
                  <ArrowLeft className='size-4 stroke-[2.5px]' />{' '}
                  <span className='text-xl lg:text-[18px] font-normal tracking-[-1.5%] leading-[75%]'>Back to Gallery</span>
               </button>
            </motion.div>
         </motion.header>
         <AnimatedWrapper>
            <p className='mx-auto text-lg mt-14'>Add first paragraph here</p>
            <p className='mx-auto text-lg mt-14'>Add second paragraph here</p>
            <p className='mx-auto text-lg mt-14'>Add third paragraph here</p>
         </AnimatedWrapper>
      </main>
   )
}
