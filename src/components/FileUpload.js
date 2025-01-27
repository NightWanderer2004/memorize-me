'use client'
import { useState } from 'react'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function FileUpload({ hasPhotos, onSuccess }) {
   const [files, setFiles] = useState([])
   const { user } = useAuth()

   const handleFileChange = event => {
      setFiles(event.target.files)
   }

   const handleUpload = async e => {
      e.stopPropagation()
      setIsOpen(false)

      const formData = new FormData()
      for (const file of files) {
         formData.append('photos', file)
      }
      formData.append('username', user.name)
      formData.append('year', year)
      formData.append('month', month)

      try {
         const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
         })

         if (!response.ok) {
            throw new Error('Upload failed')
         }

         toast.success('Files uploaded successfully')
         setFiles([])
         setYear('')
         setMonth('')
         onSuccess?.()
      } catch (error) {
         console.error('Error uploading files:', error)
         toast.error('Failed to upload files')
      }
   }

   const [isOpen, setIsOpen] = useState(false)
   const [year, setYear] = useState('')
   const [month, setMonth] = useState('')

   const toggleMenu = () => {
      setIsOpen(!isOpen)
   }

   const handleYearChange = event => {
      const value = event.target.value.replace(/\D/g, '')
      setYear(value)
   }

   const handleMonthChange = event => {
      setMonth(event.target.value)
   }

   const stopPropagation = event => {
      event.stopPropagation()
   }

   return (
      <>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className={cn('absolute top-0 w-screen h-screen bg-back/30 backdrop-blur-xl z-40 pointer-events-none', isOpen && 'pointer-events-auto')}
            onClick={toggleMenu}
         />
         <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.025 }}
            whileTap={{ scale: isOpen ? 1 : 0.99 }}
            transition={{
               ease: [0.32, 0.72, 0, 1],
               duration: 0.5,
            }}
            onClick={toggleMenu}
            className={cn(
               isOpen ? 'w-[85%] lg:w-[50%] h-[340px] -top-[90px]' : 'w-[30%] lg:w-[10%] h-[80px] lg:h-[120px]',
               hasPhotos ? 'mt-12 lg:mt-8' : 'mt-[200px]',
               'relative z-50 mx-auto flex items-center justify-center border-2 border-dotted border-primary/20 bg-stone-50/90 p-3 ',
            )}
            layout
         >
            <AnimatePresence mode='wait'>
               {!isOpen ? (
                  <motion.div>
                     <Plus className='text-tertirary' size={48} />
                  </motion.div>
               ) : (
                  <motion.div layout className='flex flex-col items-center justify-center gap-3'>
                     <div className='flex items-center gap-3'>
                        <input
                           className='w-[120px] px-3 py-1 text-lg text-center text-secondary outline-none focus:ring-2 focus:ring-accent/40 rounded-lg bg-back border border-accent/20 shadow-accent/80 placeholder:animate-pulse placeholder:text-secondary/40 transition-all'
                           type='text'
                           inputMode='numeric'
                           pattern='[0-9]*'
                           maxLength={4}
                           placeholder='Year'
                           value={year}
                           onChange={handleYearChange}
                           onClick={stopPropagation}
                        />
                        <select
                           className='w-[120px] appearance-none px-3 py-1 text-lg text-center text-secondary outline-none focus:ring-2 focus:ring-accent/40 rounded-lg bg-back border border-accent/20 shadow-accent/80 placeholder:animate-pulse placeholder:text-secondary/40 transition-all'
                           value={month}
                           onChange={handleMonthChange}
                           onClick={stopPropagation}
                        >
                           <option value='' disabled>
                              Month
                           </option>
                           <option value='January'>January</option>
                           <option value='February'>February</option>
                           <option value='March'>March</option>
                           <option value='April'>April</option>
                           <option value='May'>May</option>
                           <option value='June'>June</option>
                           <option value='July'>July</option>
                           <option value='August'>August</option>
                           <option value='September'>September</option>
                           <option value='October'>October</option>
                           <option value='November'>November</option>
                           <option value='December'>December</option>
                        </select>
                     </div>
                     <label
                        htmlFor='file-upload'
                        className='cursor-pointer w-full h-[100px] flex items-center justify-center px-3 py-1 text-lg text-secondary outline-none focus:ring-2 focus:ring-accent/40 rounded-lg bg-back border border-accent/20 shadow-accent/80 transition-all'
                        onClick={stopPropagation}
                     >
                        {files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload files'}
                     </label>
                     <input id='file-upload' type='file' multiple onChange={handleFileChange} onClick={stopPropagation} className='hidden' />
                     <motion.button
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ scale: 1.025 }}
                        transition={{ ease: 'easeOut', duration: 0.2 }}
                        className='mt-2 outline-none text-accent disabled:text-accent/30 text-lg disabled:cursor-not-allowed rounded-xl transition-colors'
                        disabled={!year || !month || !files.length}
                        onClick={handleUpload}
                     >
                        Add photos
                     </motion.button>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>
      </>
   )
}
