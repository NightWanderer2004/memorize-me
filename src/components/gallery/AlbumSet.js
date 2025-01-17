'use client'
import { motion } from 'framer-motion'
import PhotoCard from './PhotoCard'
import { useState, useEffect } from 'react'

const randomInt = (min, max) => {
   return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function AlbumSet({ month, photos }) {
   const [rotations, setRotations] = useState(photos.map(() => 0))

   useEffect(() => {
      setRotations(photos.map(() => randomInt(-3.25, 3.25)))
   }, [photos])

   const handleHover = () => {
      setRotations(photos.map(() => randomInt(-3.25, 3.25)))
   }

   return (
      <div className='relative top-4 [&>div]:last:mr-[45px] xl:[&>div]:last:mr-[120px]'>
         <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: 0.99 }}
            onHoverStart={handleHover}
            onHoverEnd={handleHover}
            transition={{
               ease: 'backOut',
               duration: 0.55,
            }}
            className='relative h-[200px] w-[300px]'
         >
            {photos.map((photo, i) => {
               const rotation = rotations[i]
               return <PhotoCard key={i} rotation={rotation} imageUrl={photo} />
            })}
         </motion.div>
         <h3 className='mt-3.5 text-xl font-normal text-secondary'>{month}</h3>
      </div>
   )
}
