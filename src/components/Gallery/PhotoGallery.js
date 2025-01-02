import PhotoCard from './PhotoCard'

const photos = [
   {
      month: 'November',
      imageUrl: '/images/sep.jpg',
   },
   {
      month: 'October',
      imageUrl: '/images/sep.jpg',
   },
   {
      month: 'September',
      imageUrl: '/images/sep.jpg',
   },
   {
      month: 'August',
      imageUrl: '/images/sep.jpg',
   },
   {
      month: 'July',
      imageUrl: '/images/sep.jpg',
   },
]

export default function PhotoGallery() {
   return (
      <div className='relative px-[88px] overflow-x-scroll flex gap-[120px] mt-[174px] no-scrollbar'>
         <div className='absolute top-[calc(50%-20px)] -left-[88px] w-full h-[3px] border-line' />
         {photos.map(photo => (
            <PhotoCard key={photo.month} month={photo.month} imageUrl={photo.imageUrl} />
         ))}
      </div>
   )
}
