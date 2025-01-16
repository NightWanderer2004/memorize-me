'use client'
import { motion, useTransform } from 'framer-motion'

export default function Years({ yearPositions, onYearSelect, smoothProgress }) {
   return (
      <div className='absolute left-0 right-0 top-8 xl:top-5'>
         {yearPositions.map(({ year, position, width }) => (
            <motion.button
               key={year}
               className='absolute text-lg xl:text-2xl font-normal'
               style={{
                  left: `${position * 100}%`,
                  color: useTransform(smoothProgress, [position - 0.05, position, position + width], ['#9ca3af', '#4682B6', '#9ca3af']),
                  transformOrigin: 'center',
                  opacity: useTransform(
                     smoothProgress,
                     [position - 0.05, position - 0.025, position, position + width + 0.025, position + width],
                     [0.5, 0.8, 1, 0.8, 0.5]
                  ),
                  scale: useTransform(
                     smoothProgress,
                     [position - 0.05, position - 0.025, position, position + width + 0.025, position + width],
                     [0.9, 0.95, 1, 0.95, 0.9]
                  ),
                  fontWeight: useTransform(smoothProgress, [position - 0.05, position, position + width], [400, 500, 400]),
               }}
               whileTap={{ scale: 0.87 }}
               transition={{
                  ease: 'backOut',
                  duration: 0.55,
               }}
               onClick={() => onYearSelect(year)}
            >
               {year}
            </motion.button>
         ))}
      </div>
   )
}
