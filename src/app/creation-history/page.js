'use client'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import One from '../../../public/us/1.jpg'
import Two from '../../../public/us/2.jpg'
import Three from '../../../public/us/3.jpg'
import Four from '../../../public/us/4.jpg'

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
                  <h1 className='text-2xl font-medium text-secondary mb-6'>What's it?</h1>
                  <p className='text-lg text-primary'>
                     The idea for creating the "Memorize Me" website was born during our time at university. As a team of friends and students, we
                     were assigned a task to come up with and implement a project for the "Frontend Development" course. One evening, the four of us
                     gathered for a brainstorming session, and that's when the idea emerged: to create a website for storing the best memories of
                     life. We—Eduard, Volodymyr, Valeriy, and Oleksandr—decided to develop a platform that allows users to upload photos and organize
                     them in a convenient format sorted by years and months. The main focus was on memories and simplicity—without unnecessary details
                     or distractions. Each user could revisit the most important moments of their life, even if they happened many years ago.
                     Essentially, it would serve as an archive for photography enthusiasts and people who enjoy reminiscing. :)
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, ease: 'easeOut', duration: 0.55 }}
               >
                  <h2 className='text-2xl font-medium text-secondary mb-6'>Our Goal</h2>
                  <p className='text-lg text-primary'>
                     The name "Memorize Me" didn’t come to us right away. We considered several options: Memorize Me, Save It All, Recall It. After
                     lengthy discussions, we decided to stick with "Memorize Me," as it was the most straightforward, concise, and best suited to the
                     primary function of our application.
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ease: 'easeOut', duration: 0.55 }}
               >
                  <h3 className='text-2xl font-medium text-secondary mb-6'>Inspiration and Simplicity</h3>
                  <p className='text-lg text-primary'>
                     The next step was defining the functionality in the smallest details. We discussed what the web application would look like, how
                     its interface would function, and what features it would provide to users. Each of us sketched and proposed ideas for the design.
                     We drew concepts on paper, discussed them, combined ideas, and eventually created the final design. Our main goal was to make the
                     interface minimalist so that nothing would distract users from viewing their memories.
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, ease: 'easeOut', duration: 0.55 }}
               >
                  <h4 className='text-2xl font-medium text-secondary mb-6'>Technologies</h4>
                  <p className='text-lg text-primary'>
                     After approving the design, we moved on to its technical implementation. This was a lengthy process that required adaptation for
                     different devices and extensive testing. Our goal was to ensure simplicity, minimalism, and user-friendliness for everyone. We
                     also spent a lot of time deciding how to host the site, but in the end, we chose to leave everything on GitHub and store files
                     locally. (We’ll figure out how to create the backend later.)
                  </p>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, ease: 'easeOut', duration: 0.55 }}
               >
                  <h5 className='text-2xl font-medium text-secondary mb-6'>Final Touch</h5>
                  <p className='text-lg text-primary'>
                     The final step was creating an icon for the web application. As expected, this stage was also challenging. We experimented with
                     various options until, through trial and error, we found the one that harmoniously fit into our project.
                  </p>
               </motion.div>
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, ease: 'easeOut', duration: 0.55 }}
               >
                  <h6 className='text-2xl font-medium text-secondary mb-6'>Work Process</h6>
                  <div className='space-y-10 '>
                     <Image className='mx-auto rounded-[2px] shadow-photo border-2 border-[#F8F9FA]' src={One} alt='One' width={700} height={600} />
                     <Image className='mx-auto rounded-[2px] shadow-photo border-2 border-[#F8F9FA]' src={Two} alt='One' width={700} height={600} />
                     <Image className='mx-auto rounded-[2px] shadow-photo border-2 border-[#F8F9FA]' src={Three} alt='One' width={700} height={600} />
                     <Image className='mx-auto rounded-[2px] shadow-photo border-2 border-[#F8F9FA]' src={Four} alt='One' width={700} height={600} />
                  </div>
                  <p className='mt-10 mb-16 text-3xl text-center text-primary'>Thanks ✦</p>
               </motion.div>
            </motion.section>
         </AnimatedWrapper>
      </main>
   )
}
