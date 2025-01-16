'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
   return (
      <header className='container mx-auto px-[16px] xl:px-[88px] flex flex-col md:flex-row justify-between items-start w-full'>
<div>
   <Link href='/' className='text-[62px] font-medium tracking-[-2%] leading-[75%] text-primary'>
      <span className='font-medium'>Memorize</span>
      <span className='text-zinc-800 font-bold'>Me</span>
   </Link>
   <p className='hidden md:block mt-[14px] lg:mt-[18px] text-lg lg:text-[21.5px] text-primary tracking-[-1.5%]'>
      A digital gallery of cherished moments
   </p>
</div>
<nav>
   <ul className='mt-6 lg:mt-0 flex gap-6 text-[18px] text-primary tracking-[-1.5%]'>
      <li>
         <Link href='/' className='hover:text-secondary transition-colors'>
            Gallery
         </Link>
      </li>
      <li>
         <Link href='/creation-history' className='hover:text-secondary transition-colors'>
            Creation history
         </Link>
      </li>
      <motion.li
         whileTap={{ scale: 0.97 }}
         transition={{
            ease: 'backOut',
            duration: 0.55,
         }}
      >
         <Link href='https://github.com/NightWanderer2004/memorize-me' className='hover:text-secondary transition-colors'>
            GitHub
         </Link>
      </motion.li>
   </ul>
</nav>
      </header>
   )
}