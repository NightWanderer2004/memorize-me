'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

export default function Header({ isWelcome }) {
   const { user, logout } = useAuth()
   const [isMenuOpen, setIsMenuOpen] = useState(false)

   if (isWelcome) return <WelcomeHeader />

   return (
      <>
         <motion.header
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'backOut', duration: 0.55 }}
            className='container mx-auto px-[16px] xl:px-[88px] flex flex-col md:flex-row justify-between items-start w-full'
         >
            <div className='flex flex-col'>
               <div className='flex items-center gap-4'>
                  <h1 className='text-[48px] lg:text-[62px] font-medium tracking-[-2%] lg:leading-[75%] text-primary'>
                     <span>Memorize</span>
                     <span className='text-accent'> me</span>
                  </h1>
                  <motion.button
                     initial={{ scale: 1 }}
                     whileTap={{ scale: 0.97 }}
                     transition={{ ease: 'backOut', duration: 0.55 }}
                     onClick={() => setIsMenuOpen(true)}
                     className='md:hidden mt-2'
                  >
                     <Menu className='text-secondary size-9' />
                  </motion.button>
               </div>
               <p className='hidden md:block mt-[14px] lg:mt-[18px] text-lg lg:text-[21.5px] text-primary tracking-[-1.5%]'>
                  A digital gallery of cherished moments
               </p>
            </div>
            <nav className='relative hidden md:block w-full md:w-auto'>
               <ul className='mt-5 md:mt-0 flex gap-6 text-xl lg:text-[18px] text-secondary tracking-[-1.5%] items-center'>
                  <motion.li
                     whileTap={{ scale: 0.97 }}
                     transition={{
                        ease: 'backOut',
                        duration: 0.55,
                     }}
                  >
                     <Link href='/creation-history' className='hover:text-accent transition-colors'>
                        Creation history
                     </Link>
                  </motion.li>
                  <motion.li whileTap={{ scale: 0.97 }} transition={{ ease: 'backOut', duration: 0.55 }}>
                     <Link href='/what-is-it' className='hover:text-accent transition-colors'>
                        What's it?
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
                        className='hover:text-accent transition-colors'
                     >
                        GitHub
                     </Link>
                  </motion.li>
                  {user && (
                     <motion.li whileTap={{ scale: 0.97 }} transition={{ ease: 'backOut', duration: 0.55 }}>
                        <button onClick={logout} className='text-orange-500 hover:text-orange-600 transition-colors'>
                           Exit
                        </button>
                     </motion.li>
                  )}
               </ul>
            </nav>
         </motion.header>

         <AnimatePresence mode='wait'>
            {isMenuOpen && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
                  transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                  className='fixed inset-0 bg-back/85 backdrop-blur-md z-50 md:hidden'
                  onClick={() => setIsMenuOpen(false)}
               >
                  <motion.div
                     initial={{ scale: 1.15, opacity: 0, filter: 'blur(12px)' }}
                     animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                     exit={{ scale: 1.1, opacity: 0, filter: 'blur(12px)', transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } }}
                     transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
                     className='absolute inset-0 pb-44 flex flex-col items-center justify-center'
                     onClick={e => setIsMenuOpen(false)}
                  >
                     <nav>
                        <ul className='flex flex-col items-center text-secondary font-light text-3xl gap-6'>
                           <motion.li whileTap={{ scale: 0.97 }} transition={{ ease: 'backOut', duration: 0.55 }}>
                              <Link href='/creation-history' className='transition-colors' onClick={() => setIsMenuOpen(false)}>
                                 Creation history
                              </Link>
                           </motion.li>
                           <motion.li whileTap={{ scale: 0.97 }} transition={{ ease: 'backOut', duration: 0.55 }}>
                              <Link href='/what-is-it' className='transition-colors' onClick={() => setIsMenuOpen(false)}>
                                 What's it?
                              </Link>
                           </motion.li>
                           <motion.li whileTap={{ scale: 0.97 }} transition={{ ease: 'backOut', duration: 0.55 }}>
                              <Link
                                 href='https://github.com/NightWanderer2004/memorize-me'
                                 target='_blank'
                                 rel='noopener noreferrer'
                                 className='hover:text-accent transition-colors'
                                 onClick={() => setIsMenuOpen(false)}
                              >
                                 GitHub
                              </Link>
                           </motion.li>
                           {user && (
                              <motion.li whileTap={{ scale: 0.97 }} transition={{ ease: 'backOut', duration: 0.55 }}>
                                 <button
                                    onClick={() => {
                                       logout()
                                       setIsMenuOpen(false)
                                    }}
                                    className='text-orange-500 hover:text-orange-600 transition-colors'
                                 >
                                    [ Exit ]
                                 </button>
                              </motion.li>
                           )}
                        </ul>
                     </nav>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </>
   )
}

function WelcomeHeader() {
   return (
      <header>
         <h1 className='text-[54px] lg:text-[62px] font-medium tracking-[-2%] leading-[75%] text-primary'>
            <span>Memorize</span>
            <span className='text-accent'> me</span>
         </h1>
         <p className='mt-[14px] lg:mt-[18px] text-center text-base lg:text-lg text-primary tracking-[-1.5%]'>
            A digital gallery of cherished moments
         </p>
      </header>
   )
}
