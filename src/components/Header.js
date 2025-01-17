'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
   return (
      <motion.header
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ ease: 'backOut', duration: 0.55 }}
         className='container mx-auto px-[16px] xl:px-[88px] flex flex-col md:flex-row justify-between items-start w-full'
      >
         <div>
            <Link href='/' className='text-[54px] lg:text-[62px] font-medium tracking-[-2%] leading-[75%] text-primary'>
               <span>Memorize</span>
               <span className='text-accent'> me</span>
            </Link>
            <p className='hidden md:block mt-[14px] lg:mt-[18px] text-lg lg:text-[21.5px] text-primary tracking-[-1.5%]'>
               A digital gallery of cherished moments
            </p>
         </div>
         <nav>
            <ul className='mt-5 md:mt-0 flex gap-6 text-xl lg:text-[18px] text-accent tracking-[-1.5%]'>
               <motion.li
                  whileTap={{ scale: 0.97 }}
                  transition={{
                     ease: 'backOut',
                     duration: 0.55,
                  }}
               >
                  <Link href='/creation-history' className='hover:text-secondary transition-colors'>
                     Creation history
                  </Link>
               </motion.li>
               <motion.li
                  whileTap={{ scale: 0.97 }}
                  transition={{
                     ease: 'backOut',
                     duration: 0.55,
                  }}
               >
                  <Link
                     href='https://github.com/NightWanderer2004/memorize-me'
                     target='_blank'
                     rel='noopener noreferrer'
                     className='hover:text-secondary transition-colors'
                  >
                     GitHub
                  </Link>
               </motion.li>
            </ul>
         </nav>
      </motion.header>
   )
}
