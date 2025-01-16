'use client'
import { motion, useTransform } from 'framer-motion'

export default function Lines({ linesCount, smoothProgress }) {
   return (
      <div className='absolute left-3 xl:left-6 right-3 xl:right-6 bottom-4 h-5'>
         {Array.from({ length: linesCount }).map((_, index) => {
            const progress = index / linesCount
            const isFifthLine = (index + 1) % 10 === 0 || index === 0

            return (
               <motion.div
                  key={index}
                  className='absolute bottom-0 w-full h-full rounded-xl'
                  style={{
                     left: `${progress * 100}%`,
                     backgroundColor: useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['#d1d5db', '#4682B6', '#d1d5db']),
                     opacity: useTransform(smoothProgress, [progress - 0.05, progress, progress + 0.05], [0.25, 1, 0.25]),
                     width: useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['2px', '2.25px', '2px']),
                     height: useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['14px', '20px', '14px']),
                     // height: isFifthLine
                     //    ? useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['16px', '18px', '16px'])
                     //    : useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['10px', '12px', '10px']),
                  }}
               />
            )
         })}
      </div>
   )
}
