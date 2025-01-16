'use client'
import { useTransform } from 'framer-motion'
import { useRef, useMemo } from 'react'
import AnimatedWrapper from '../AnimatedWrapper'
import Lines from './Lines'
import Years from './Years'

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
               <Years yearPositions={yearPositions} onYearSelect={onYearSelect} smoothProgress={smoothProgress} />
               <Lines linesCount={linesCount} smoothProgress={smoothProgress} />
            </AnimatedWrapper>
         </div>
      </div>
   )
}
