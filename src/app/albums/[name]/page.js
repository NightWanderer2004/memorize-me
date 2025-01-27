'use client'
import React, { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import TimelineContainer from '@/components/timeline/TimelineContainer'
import AnimatedWrapper from '@/components/AnimatedWrapper'
import FileUpload from '@/components/FileUpload'
import { cn } from '@/lib/utils'

async function getUser(name) {
   try {
      const res = await fetch(`${process.env.BASE_URL || 'http://localhost:3000'}/api/users`, {
         next: {
            revalidate: 60,
         },
      })

      if (!res.ok) {
         console.error('Failed to fetch users:', await res.text())
         return null
      }

      const users = await res.json()
      if (!Array.isArray(users)) {
         console.error('Invalid users response:', users)
         return null
      }

      return users.find(user => user.name.toLowerCase() === name.toLowerCase())
   } catch (error) {
      console.error('Error fetching user:', error)
      return null
   }
}

function organizePhotosByDate(photos) {
   if (!photos || !photos.length) return []

   const photosByYear = photos.reduce((acc, photo) => {
      const pathParts = photo.url.split('/')
      const year = parseInt(pathParts[3], 10)
      const month = pathParts[4]

      if (!acc[year]) {
         acc[year] = {
            year,
            albums: [],
         }
      }

      const existingMonth = acc[year].albums.find(album => album.month === month)

      if (existingMonth) {
         existingMonth.photos.push(photo)
      } else {
         acc[year].albums.push({
            month,
            photos: [photo],
         })
      }

      return acc
   }, {})

   // Convert to array and sort by year
   return Object.values(photosByYear).sort((a, b) => b.year - a.year)
}

// export async function generateMetadata({ params }) {
//    const { name } = await params
//    return {
//       title: `${name}'s Albums`,
//    }
// }

export default function UserAlbumsPage({ params }) {
   const { name } = React.use(params)
   const [userData, setUserData] = useState(null)
   const [timelineData, setTimelineData] = useState([])
   const [loading, setLoading] = useState(true)

   const fetchUserData = async () => {
      const user = await getUser(name.toLowerCase())
      if (!user) notFound()
      setUserData(user)
      const photos = user.photos || []
      setTimelineData(organizePhotosByDate(photos))
      setLoading(false)
   }

   useEffect(() => {
      fetchUserData()
   }, [name])

   if (loading) return null

   const hasPhotos = userData?.photos?.length > 0
   const username = userData.name.charAt(0).toUpperCase() + userData.name.slice(1)

   return (
      <main>
         <Header />
         <div className={cn(hasPhotos ? 'hidden' : 'block', 'absolute w-full md:w-auto bottom-safe left-1/2 -translate-x-1/2 px-4 py-8')}>
            <AnimatedWrapper>
               {/* <FileUpload onSuccess={fetchUserData} /> */}
               <p className='text-3xl text-accent font-medium'>
                  Hi, <span>{username}!</span> <br className='md:hidden' />{' '}
                  <span className='font-normal text-primary text-2xl md:text-3xl md:ml-2'>Let's add some photos</span>
               </p>
            </AnimatedWrapper>
         </div>

         <TimelineContainer hasPhotos={hasPhotos} timelineData={timelineData} />
         <AnimatedWrapper>
            <FileUpload hasPhotos={hasPhotos} onSuccess={fetchUserData} />
         </AnimatedWrapper>
      </main>
   )
}
