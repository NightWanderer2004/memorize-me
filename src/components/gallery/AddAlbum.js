'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { PlusSquare } from 'lucide-react'

export default function AddAlbum() {
   return (
      <div className='relative top-4  [&>div]:last:mr-[45px] xl:[&>div]:last:mr-[120px]'>
         <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.99 }}
            transition={{
               ease: 'backOut',
               duration: 0.55,
            }}
            className='group relative flex h-[200px] w-[300px] cursor-pointer items-center justify-center overflow-hidden rounded-[2px] border-2 border-dashed border-primary/15 bg-stone-50 hover:bg-accent/5 shadow-none transition-colors hover:border-accent'
         >
            <PlusSquare className='size-12 stroke-[0.75px] text-primary/20 transition-colors group-hover:text-accent' />
         </motion.div>
      </div>
   )
}
