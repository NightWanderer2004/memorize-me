'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Header from '@/components/Header'
import AnimatedWrapper from '@/components/AnimatedWrapper'

export default function UserAlbums({ params }) {
   const { username } = params
   const { user } = useAuth()
   const router = useRouter()

   useEffect(() => {
      if (!user) {
         router.replace('/')
      }
   }, [user, router])

   return (
      <main>
         <Header />
         <AnimatedWrapper>
            <div className='container mx-auto px-4 mt-8'>
               <h2 className='text-2xl font-medium text-primary'>{username}'s Albums</h2>
               <p className='text-secondary mt-4'>No albums yet</p>
            </div>
         </AnimatedWrapper>
      </main>
   )
}
