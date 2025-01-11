'use client'
import data from '../../../public/data'
import AlbumSet from './AlbumSet'

export default function PhotoGallery() {
   return (
      <div className='relative mt-[150px]'>
         <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[3px] border-line' />
         <div className='flex gap-[120px] px-[88px] py-[20px] no-scrollbar overflow-x-auto'>
            {data.years[0].albums.map(album => (
               <AlbumSet key={album.month} month={album.month} photos={album.photos} />
            ))}
         </div>
      </div>
   )
}
