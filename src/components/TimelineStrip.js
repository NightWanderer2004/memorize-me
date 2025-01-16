'use client'
import { motion, useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Plus, PlusSquare } from 'lucide-react'
import AnimatedWrapper from './AnimatedWrapper'

export default function TimelineStrip({ years, onYearSelect, scrollProgress }) {
   const containerRef = useRef(null)

   const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false
   const linesCount = isMobile ? 50 : 90

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

               {/* Timeline lines */}
               <div className='absolute left-3 xl:left-6 right-3 xl:right-6 bottom-4 h-5'>
                  {/* <motion.button
                     initial={{ scale: 1 }}
                     whileHover={{ scale: 1.025 }}
                     whileTap={{ scale: 0.99 }}
                     transition={{
                        ease: 'backOut',
                        duration: 0.55,
                     }}
                     className='absolute -bottom-1 -left-12 '
                  >
                     <PlusSquare className='size-9 stroke-1 text-[#d1d5db] transition-colors hover:text-accent' />
                  </motion.button> */}
                  {Array.from({ length: linesCount }).map((_, index) => {
                     const progress = index / (linesCount - 1)

                     return (
                        <motion.div
                           key={index}
                           className='absolute bottom-0 w-full h-full rounded-xl'
                           style={{
                              left: `${progress * 100}%`,
                              backgroundColor: useTransform(
                                 smoothProgress,
                                 [progress - 0.02, progress, progress + 0.02],
                                 ['#d1d5db', '#4682B6', '#d1d5db']
                              ),
                              opacity: useTransform(smoothProgress, [progress - 0.1, progress, progress + 0.1], [0.3, 1, 0.3]),
                              width: useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['2px', '2.25px', '2px']),
                              height: useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['14px', '16px', '14px']),
                           }}
                        />
                     )
                  })}
               </div>
            </AnimatedWrapper>
         </div>
      </div>
   )
}
