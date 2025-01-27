'use client'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
   const router = useRouter()
   const [user, setUser] = useState(null)

   // Check localStorage for existing user
   useEffect(() => {
      const storedUser = localStorage.getItem('user')
      if (storedUser) setUser(JSON.parse(storedUser))
   }, [])

   const login = async (name, code) => {
      try {
         const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, code }),
         })

         if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error || 'Failed to authenticate')
         }

         const userData = await res.json()

         setTimeout(() => {
            setUser(userData)
            localStorage.setItem('user', JSON.stringify(userData))
            router.push('/')
         }, 320) // Match animation duration

         return { success: true }
      } catch (error) {
         return { success: false, error: error.message }
      }
   }

   const logout = () => {
      setUser(null)
      localStorage.removeItem('user')
      router.push('/')
   }

   return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
