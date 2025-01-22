'use client'
import { useEffect, useState } from 'react'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function Welcome() {
   const [inputValue, setInputValue] = useState('')
   const [animateUp, setAnimateUp] = useState(false)
   const router = useRouter()

   useEffect(() => {
      if (animateUp) {
         const timer = setTimeout(() => {
            router.replace('/albums')
         }, 320)
         return () => clearTimeout(timer)
      }
   }, [animateUp])

   const handleClick = () => {
      setAnimateUp(true)
   }

   const handleKeyPress = e => {
      if (e.key === 'Enter' && inputValue) {
         handleClick()
         e.target.blur() // Hide mobile keyboard
      }
   }

   return (
      <div className='min-h-dvh pb-10 lg:pb-24 flex flex-col items-center justify-center container mx-auto max-w-5xl w-full '>
         <AnimatedWrapper>
            <motion.div
               initial={{ y: 0, opacity: 1 }}
               animate={{ y: animateUp ? -1000 : 0, opacity: animateUp ? 0 : 1 }}
               transition={{ ease: 'easeInOut', duration: 0.45 }}
            >
               <Header isWelcome />
               <div className='mt-8 lg:mt-10 flex flex-col items-center justify-center gap-3.5 lg:gap-4'>
                  <input
                     type='text'
                     placeholder='Your name'
                     value={inputValue}
                     onChange={e => setInputValue(e.target.value)}
                     onKeyDown={handleKeyPress}
                     className='w-[190px] px-3 py-1.5 text-xl text-center text-secondary outline-none focus:ring-2 focus:ring-accent/40 rounded-lg bg-back border border-accent/20 shadow-minimal shadow-accent/80 placeholder:animate-pulse placeholder:text-secondary/40 transition-all'
                  />
                  <motion.button
                     whileTap={{ scale: 0.98 }}
                     transition={{ ease: 'backOut', duration: 0.15 }}
                     className='outline-none focus:underline underline-offset-2 text-accent disabled:text-accent/30 text-lg disabled:cursor-not-allowed rounded-xl transition-all'
                     disabled={!inputValue}
                     onClick={handleClick}
                  >
                     Enter gallery
                  </motion.button>
               </div>
            </motion.div>
         </AnimatedWrapper>
      </div>
   )
}
