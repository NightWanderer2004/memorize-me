'use client'
import { useRef, useEffect, useState } from 'react'
import { useScroll, useSpring } from 'framer-motion'
import TimelineStrip from '@/components/timeline/TimelineStrip'
import Header from '@/components/Header'
import AlbumSet from '@/components/gallery/AlbumSet'
import data from '../../data'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import AddAlbum from '@/components/gallery/AddAlbum'
import useIsMobile from '@/hooks/useIsMobile'

export default function Home() {
   const containerRef = useRef(null)
   const isMobile = useIsMobile()
   const [containerWidth, setContainerWidth] = useState(0)
   const [dimensions, setDimensions] = useState({
      albumWidth: 420,
      gapWidth: 120,
      sideOffset: 120,
   })

   // Update dimensions based on screen size
   useEffect(() => {
      setDimensions({
         albumWidth: isMobile ? 300 : 420,
         gapWidth: isMobile ? 100 : 120,
         sideOffset: isMobile ? 45 : 120,
      })
   }, [isMobile])

   // Update container width
   useEffect(() => {
      if (typeof window === 'undefined') return

      const updateContainerWidth = () => {
         if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth)
         }
      }

      updateContainerWidth()
      window.addEventListener('resize', updateContainerWidth)
      return () => window.removeEventListener('resize', updateContainerWidth)
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
            if (!isMobile) {
               const centerOffset = (containerWidth - dimensions.albumWidth) / 2
               return Math.max(0, position - centerOffset)
            }
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

            if (scrollPosition >= accumWidth && scrollPosition < accumWidth + yearWidth) break

            accumWidth += yearWidth + dimensions.gapWidth
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
               {/* Desktop */}
               <div className='hidden md:flex gap-[100px] xl:gap-[120px] px-[45px] xl:px-[120px] relative'>
                  {/* <AddAlbum /> */}
                  {data.years.map((year, i) => (
                     <div key={i} className='flex gap-[100px] xl:gap-[120px] relative'>
                        <div
                           className='hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-[1.5px] bg-gradient-to-b from-transparent via-tertirary/70 to-transparent'
                           aria-hidden='true'
                        />
                        {year.albums.map((album, j) => (
                           <AlbumSet key={j} month={album.month} photos={album.photos} />
                        ))}
                     </div>
                  ))}
               </div>
               {/* Mobile */}
               <div className='flex md:hidden gap-[100px] lg:gap-[120px] px-[45px] xl:px-[120px]'>
                  {/* <AddAlbum /> */}
                  {data.years.map((year, i) =>
                     year.albums.map((album, j) => <AlbumSet key={`${i}-${j}`} month={album.month} photos={album.photos} />)
                  )}
               </div>
            </AnimatedWrapper>
         </div>
         <TimelineStrip years={data.years} onYearSelect={handleYearSelect} scrollProgress={smoothScrollProgress} />
      </main>
   )
}
