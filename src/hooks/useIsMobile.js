'use client'
import { useState, useEffect } from 'react'

export default function useIsMobile() {
   const [isMobile, setIsMobile] = useState(false)

   useEffect(() => {
      if (typeof window === 'undefined') return

      const checkMobile = () => {
         setIsMobile(window.innerWidth < 768)
      }

      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
   }, [])

   return isMobile
}
