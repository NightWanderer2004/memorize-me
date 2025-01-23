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
            <motion.section 
               className='space-y-12 mt-14'
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ ease: 'easeOut', duration: 0.55 }}
            >
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, ease: 'easeOut', duration: 0.55 }}
               >
                  <h1 className='text-2xl font-medium text-primary mb-6'>What's it?</h1>
                  <p className='text-lg'>
                     Welcome to "Memorize Me" — a digital gallery of cherished moments, created as part of a study project 
                     and based on our concept. The main idea of this website is to store your memories in one place. 
                     Simply upload your photos and specify the date when they were taken. It's simple, fast, and free.
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ease: 'easeOut', duration: 0.55 }}
               >
                  <h2 className='text-2xl font-medium text-primary mb-6'>Our Goal</h2>
                  <p className='text-lg'>
                     Our goal is to create a clean, beautiful, and convenient website for everyone who wants to store 
                     their memories in an easy way. While developing the website, we compared many different technologies 
                     and popular services for storing photos, blogs, and other data. We found that most popular services 
                     are not free and contain ads, pop-ups, and user tracking. We want to create something different: 
                     a service that is free, without ads, pop-ups, or tracking, and designed for a niche audience that 
                     values these details.
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ease: 'easeOut', duration: 0.55 }}
               >
                  <h3 className='text-2xl font-medium text-primary mb-6'>Inspiration and Simplicity</h3>
                  <p className='text-lg'>
                     Inspired by aesthetics and a desire for simplicity, we created this website. We hope it will be 
                     both enjoyable and useful for you.
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, ease: 'easeOut', duration: 0.55 }}
               >
                  <h4 className='text-2xl font-medium text-primary mb-6'>Technologies</h4>
                  <p className='text-lg'>
                     This project was built using modern technologies and trends, such as: React, Next.js, Tailwind, 
                     and Framer Motion for smooth and beautiful animations.
                  </p>
               </motion.div>
            </motion.section>
         </AnimatedWrapper>
      </main>
   )
}