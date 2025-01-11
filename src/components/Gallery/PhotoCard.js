import { cn } from '@/utils'
import Image from 'next/image'

export default function PhotoCard({ rotation, imageUrl }) {
   return (
      <div
         style={{ transform: `rotate(${rotation}deg)` }}
         className='absolute h-[198px] w-[295px] overflow-hidden rounded-[2px] shadow-photo border-2 border-[#F8F9FA] transform transition-transform duration-[400ms] ease-out'
      >
         <Image className='pointer-events-none' src={imageUrl} alt={imageUrl} fill />
      </div>
   )
}
