'use client'
import { motion, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Plus, PlusSquare } from 'lucide-react'
import AnimatedWrapper from '../AnimatedWrapper'
import Lines from './Lines'

export default function TimelineStrip({ years, onYearSelect, scrollProgress }) {
   const containerRef = useRef(null)

   const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false
   const linesCount = isMobile ? 50 : 100

   const smoothProgress = useTransform(scrollProgress, value => value)

   const yearPositions = useMemo(() => {
      const positions = []
      let currentPosition = 0

      const totalSpace = years.reduce((acc, year) => {
         return acc + year.albums.length
      }, 0)

      years.forEach(year => {
         const yearWidth = year.albums.length / totalSpace + 0.05

         positions.push({
            year: year.year,
            position: currentPosition / totalSpace + yearWidth * 0.05,
            width: yearWidth,
         })

         currentPosition += year.albums.length
      })

      return positions
   }, [years])

   return (
      <div className='fixed bottom-0 left-0 right-0 px-5 xl:px-16 h-24'>
         <div ref={containerRef} className='relative h-full max-w-5xl mx-auto'>
            <AnimatedWrapper className='relative h-full'>
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

               <Lines linesCount={linesCount} smoothProgress={smoothProgress} />
            </AnimatedWrapper>
         </div>
      </div>
   )
}
