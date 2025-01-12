'use client'
import { useRef, useEffect } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import TimelineStrip from '@/components/TimelineStrip'
import Header from '@/components/Header'
import AlbumSet from '@/components/Gallery/AlbumSet'
import data from '../../data'

export default function Home() {
   const containerRef = useRef(null)

   const { scrollXProgress } = useScroll({
      container: containerRef,
   })

   const smoothScrollProgress = useSpring(scrollXProgress, {
      stiffness: 690,
      damping: 75,
      mass: 0.25,
   })

   // Calculate total width of all albums
   const albumWidth = 250

   const totalWidth = data.years.reduce((acc, year) => {
      return acc + year.albums.length * albumWidth
   }, 0)

   // Update selected year based on scroll position
   useEffect(() => {
      const unsubscribe = smoothScrollProgress.on('change', latest => {
         const scrollPosition = latest * totalWidth
         let accumWidth = 0

         for (const year of data.years) {
            const yearWidth = year.albums.length * albumWidth
            if (scrollPosition >= accumWidth && scrollPosition < accumWidth + yearWidth) {
               break
            }
            accumWidth += yearWidth
         }
      })

      return () => unsubscribe()
   }, [smoothScrollProgress, totalWidth])

   const handleYearSelect = year => {
      if (!containerRef.current) return

      let scrollTo = 0
      for (const y of data.years) {
         if (y.year === year) break
         scrollTo += y.albums.length * albumWidth
      }

      containerRef.current.scrollTo({
         left: scrollTo,
         behavior: 'smooth',
      })
   }

   return (
      <main className='min-h-screen'>
         <Header />
         <div
            ref={containerRef}
            className='fixed top-[475px] left-10 right-10 -translate-y-1/2 h-[400px] overflow-x-auto overflow-y-hidden no-scrollbar'
         >
            <div className='flex gap-[120px] px-4 lg:px-[88px]'>
               {data.years.map(year =>
                  year.albums.map(album => <AlbumSet key={`${year.year}-${album.month}`} month={album.month} photos={album.photos} />)
               )}
            </div>
         </div>
         <TimelineStrip years={data.years} onYearSelect={handleYearSelect} scrollProgress={smoothScrollProgress} />
      </main>
   )
}
