'use client'
import { useRef, useEffect, useState } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import TimelineStrip from '@/components/TimelineStrip'
import Header from '@/components/Header'
import AlbumSet from '@/components/gallery/AlbumSet'
import data from '../../data'
import AnimatedWrapper from '@/components/AnimatedWrapper'

export default function Home() {
   const containerRef = useRef(null)
   const [dimensions, setDimensions] = useState({
      albumWidth: 420,
      gapWidth: 120,
      sideOffset: 120,
   })

   // Update dimensions based on screen size
   useEffect(() => {
      const updateDimensions = () => {
         const isMobile = window.innerWidth < 1024
         setDimensions({
            albumWidth: isMobile ? 300 : 420,
            gapWidth: isMobile ? 100 : 120,
            sideOffset: isMobile ? 45 : 120,
         })
      }

      updateDimensions()
      window.addEventListener('resize', updateDimensions)
      return () => window.removeEventListener('resize', updateDimensions)
   }, [])

   const { scrollXProgress } = useScroll({
      container: containerRef,
   })

   const smoothScrollProgress = useSpring(scrollXProgress, {
      stiffness: 690,
      damping: 75,
      mass: 0.25,
   })

   // Calculate total scrollable width
   const getTotalWidth = () => {
      // Count total number of albums
      const totalAlbums = data.years.reduce((acc, year) => acc + year.albums.length, 0)

      // Calculate total width including gaps
      return totalAlbums * dimensions.albumWidth + (totalAlbums - 1) * dimensions.gapWidth + dimensions.sideOffset * 2 // Left and right padding
   }

   // Calculate position for specific year
   const getYearPosition = targetYear => {
      let position = dimensions.sideOffset

      for (const year of data.years) {
         if (year.year === targetYear) {
            return Math.max(0, position - dimensions.sideOffset)
         }
         position += year.albums.length * dimensions.albumWidth + (year.albums.length - 1) * dimensions.gapWidth
         position += dimensions.gapWidth // Add gap between years
      }

      return position
   }

   // Update selected year based on scroll position
   useEffect(() => {
      const unsubscribe = smoothScrollProgress.on('change', latest => {
         if (!containerRef.current) return

         const scrollPosition = latest * getTotalWidth()
         let accumWidth = dimensions.sideOffset

         for (const year of data.years) {
            const yearWidth = year.albums.length * dimensions.albumWidth + (year.albums.length - 1) * dimensions.gapWidth

            if (scrollPosition >= accumWidth && scrollPosition < accumWidth + yearWidth) {
               // Current year found
               break
            }
            accumWidth += yearWidth + dimensions.gapWidth // Добавляем гэп между годами
         }
      })

      return () => unsubscribe()
   }, [smoothScrollProgress, dimensions])

   const handleYearSelect = year => {
      if (!containerRef.current) return

      const scrollTo = getYearPosition(year)

      containerRef.current.scrollTo({
         left: scrollTo,
         behavior: 'smooth',
      })
   }

   return (
      <main className='min-h-screen'>
         <Header />
         <div ref={containerRef} className='fixed top-[300px] left-0 right-0 h-[400px] overflow-x-auto overflow-y-hidden no-scrollbar'>
            <AnimatedWrapper>
               <div className='flex gap-[100px] lg:gap-[120px] px-[45px] xl:px-[120px]'>
                  {data.years.map((year, i) => year.albums.map(album => <AlbumSet key={i} month={album.month} photos={album.photos} />))}
               </div>
            </AnimatedWrapper>
         </div>
         <TimelineStrip years={data.years} onYearSelect={handleYearSelect} scrollProgress={smoothScrollProgress} />
      </main>
   )
}
