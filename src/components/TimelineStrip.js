'use client'

import { motion, useSpring, useTransform, MotionValue } from 'framer-motion'
import { useRef, useMemo } from 'react'

export default function TimelineStrip({ years, onYearSelect, scrollProgress }) {
   const containerRef = useRef(null)
   const totalAlbums = useMemo(() => years.reduce((acc, year) => acc + year.albums.length, 0), [years])

   const isMobile = window.innerWidth <= 768
   const linesCount = isMobile ? 45 : 90

   const smoothProgress = useTransform(scrollProgress, value => value)

   // Calculate year positions based on their album counts
   const yearPositions = useMemo(() => {
      const positions = []
      let currentPosition = 0

      years.forEach(year => {
         positions.push({
            year: year.year,
            position: currentPosition / totalAlbums,
         })
         currentPosition += year.albums.length
      })

      return positions
   }, [years, totalAlbums])

   return (
      <div className='fixed bottom-0 left-0 right-0 px-5 lg:px-16 h-24'>
         <div ref={containerRef} className='relative h-full max-w-5xl mx-auto'>
            {/* Year labels */}
            <div className='absolute left-0 right-0 top-5'>
               {yearPositions.map(({ year, position }) => (
                  <motion.button
                     key={year}
                     className='absolute text-2xl font-light'
                     style={{
                        left: `${position * 100}%`,
                        color: useTransform(smoothProgress, [position - 0.1, position, position + 0.1], ['#9ca3af', '#000000', '#9ca3af']),
                        transformOrigin: 'center',
                        opacity: useTransform(
                           smoothProgress,
                           [position - 0.2, position - 0.1, position, position + 0.1, position + 0.2],
                           [0.3, 0.7, 1, 0.7, 0.3]
                        ),
                     }}
                     whileTap={{ scale: 0.97 }}
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
            <div className='absolute left-3 lg:left-6 right-3 lg:right-6 bottom-4 h-5'>
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
                           opacity: useTransform(smoothProgress, [progress - 0.05, progress, progress + 0.05], [0.3, 1, 0.3]),
                           width: useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['2px', '2.25px', '2px']),
                           height: useTransform(smoothProgress, [progress - 0.02, progress, progress + 0.02], ['14px', '16px', '14px']),
                        }}
                     />
                  )
               })}
            </div>
         </div>
      </div>
   )
}
