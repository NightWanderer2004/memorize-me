import Image from 'next/image'

export default function PhotoCard({ month, imageUrl }) {
   return (
      <div>
         <div className='h-[198px] w-[295px] overflow-hidden rounded-[2px] shadow-photo border border-[#fffffc]/80 transform transition-transform'>
            <Image src={imageUrl} alt={`Photo from ${month}`} fill />
         </div>
         <h3 className='mt-2 text-2xl font-normal text-secondary'>{month}</h3>
      </div>
   )
}
