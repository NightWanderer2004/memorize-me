'use client'
import { useEffect, useState } from 'react'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function Welcome() {
   const [name, setName] = useState('')
   const [code, setCode] = useState('')
   const [animateUp, setAnimateUp] = useState(false)
   const [error, setError] = useState('')
   const router = useRouter()
   const { login, user } = useAuth()

   useEffect(() => {
      if (user) router.replace('/albums')
   }, [user, router])

   const handleSubmit = async () => {
      if (code.length !== 4) {
         setError('Code must be 4 digits')
         return
      }

      const result = await login(name, code)

      if (result.success) setAnimateUp(true)
      else setError(result.error)
   }

   const handleKeyPress = e => {
      if (e.key === 'Enter' && name && code) {
         handleSubmit()
         e.target.blur()
      }
   }

   return (
      <div className=' pt-[180px] flex flex-col items-center justify-center container mx-auto max-w-5xl w-full'>
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
                     value={name}
                     onChange={e => {
                        setName(e.target.value)
                        setError('')
                     }}
                     onKeyDown={handleKeyPress}
                     className='w-[160px] px-3 py-1 text-xl text-center text-secondary outline-none focus:ring-2 focus:ring-accent/40 rounded-lg bg-back border border-accent/20 shadow-minimal shadow-accent/80 placeholder:animate-pulse placeholder:text-secondary/40 transition-all'
                  />
                  <input
                     type='password'
                     inputMode='numeric'
                     pattern='[0-9]*'
                     maxLength={4}
                     placeholder='Code (4 digits)'
                     value={code}
                     onChange={e => {
                        const value = e.target.value.replace(/\D/g, '')
                        if (value.length <= 4) {
                           setCode(value)
                           setError('')
                        }
                     }}
                     onKeyDown={handleKeyPress}
                     className='w-[160px] px-3 py-1 text-xl text-center text-secondary outline-none focus:ring-2 focus:ring-accent/40 rounded-lg bg-back border border-accent/20 shadow-minimal shadow-accent/80 placeholder:animate-pulse placeholder:text-secondary/40 transition-all'
                  />
                  {error && <p className='text-red-500 text-sm'>{error}</p>}
                  <motion.button
                     whileTap={{ scale: 0.98 }}
                     transition={{ ease: 'backOut', duration: 0.15 }}
                     className='outline-none focus:underline underline-offset-2 text-accent disabled:text-accent/30 text-lg disabled:cursor-not-allowed rounded-xl transition-all'
                     disabled={!name || !code}
                     onClick={handleSubmit}
                  >
                     Enter gallery
                  </motion.button>
               </div>
            </motion.div>
         </AnimatedWrapper>
      </div>
   )
}
