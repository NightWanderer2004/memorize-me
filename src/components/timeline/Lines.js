'use client'
import useIsMobile from '@/hooks/useIsMobile'
import { motion, useTransform } from 'framer-motion'

export default function Lines({ smoothProgress }) {
   const isMobile = useIsMobile()
   const linesCount = isMobile ? 50 : 100

   return (
      <div className='absolute left-3 xl:left-6 right-3 xl:right-6 bottom-4 h-5'>
         {Array.from({ length: linesCount }).map((_, index) => {
            const progress = index / (linesCount - 1)

            return <Line key={index} progress={progress} smoothProgress={smoothProgress} />
         })}
      </div>
   )
}

function Line({ index, progress, smoothProgress }) {
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
         }}
      />
   )
}
