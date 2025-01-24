import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import TimelineContainer from '@/components/timeline/TimelineContainer'
import AnimatedWrapper from '@/components/AnimatedWrapper'

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
      const date = new Date(photo.date)
      const year = date.getFullYear()
      const month = date.getMonth()

      if (!acc[year]) {
         acc[year] = {
            year,
            albums: Array(12)
               .fill()
               .map(() => ({ photos: [] })),
         }
      }

      acc[year].albums[month].photos.push(photo)
      return acc
   }, {})

   return Object.values(photosByYear)
      .filter(year => year.albums.some(album => album.photos.length > 0))
      .map(year => ({
         ...year,
         albums: year.albums.map((album, index) => ({ ...album, month: index })).filter(album => album.photos.length > 0),
      }))
      .sort((a, b) => b.year - a.year)
}

export async function generateMetadata({ params }) {
   const { name } = await params
   return {
      title: `${name}'s Albums`,
   }
}

export default async function UserAlbumsPage({ params }) {
   const { name } = await params
   const user = await getUser(name.toLowerCase())
   if (!user) notFound()

   // Initialize empty photos array if not present
   const photos = user.photos || []
   const hasPhotos = photos.length > 0
   const timelineData = organizePhotosByDate(photos)

   return (
      <main>
         <Header />
         {!hasPhotos ? (
            <div className='absolute bottom-safe container mx-auto px-4 py-8'>
               <AnimatedWrapper>
                  <p className='text-3xl text-accent font-medium mb-4'>
                     Hi, {user.name}! <br /> <span className='font-normal text-primary text-2xl'>Let's add some photos</span>
                  </p>
               </AnimatedWrapper>
            </div>
         ) : (
            <TimelineContainer timelineData={timelineData} />
         )}
      </main>
   )
}
