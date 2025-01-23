import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { hashCode } from '@/lib/hash'

const dataFile = path.join(process.cwd(), 'public', 'data', 'users.json')

// Read users from file
async function getUsers() {
   try {
      const data = await fs.readFile(dataFile, 'utf8')
      return JSON.parse(data).users
   } catch (error) {
      console.error('Error reading users:', error)
      return []
   }
}

// POST /api/users
export async function POST(req) {
   try {
      const { name, code } = await req.json()

      if (!name || !code) {
         return NextResponse.json({ error: 'Name and code are required' }, { status: 400 })
      }

      if (!/^\d{4}$/.test(code)) {
         return NextResponse.json({ error: 'Code must be 4 digits' }, { status: 400 })
      }

      const users = await getUsers()
      const hashedCode = hashCode(code)

      // Debug logging (temporary)
      console.log('Login attempt:', {
         name,
         hashedCode,
         existingUsers: users.map(u => ({ name: u.name, code: u.code })),
      })

      // Check if user already exists
      const existingUser = users.find(user => user.name.toLowerCase() === name.toLowerCase())
      if (existingUser) {
         if (existingUser.code !== hashedCode) {
            return NextResponse.json({ error: 'Incorrect code' }, { status: 401 })
         }
         return NextResponse.json({
            id: existingUser.id,
            name: existingUser.name,
            createdAt: existingUser.createdAt,
         })
      }

      // If we get here, it's a new user
      const newUser = {
         id: Date.now().toString(),
         name,
         code: hashedCode,
         createdAt: new Date().toISOString(),
      }

      users.push(newUser)

      try {
         await fs.writeFile(dataFile, JSON.stringify({ users }, null, 2))

         // Trigger GitHub sync after successful user creation
         try {
            const syncResponse = await fetch('/api/sync', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  message: `Added new user: ${name}`,
                  files: ['public/data/users.json'],
               }),
            })

            if (!syncResponse.ok) {
               console.error('GitHub sync failed:', await syncResponse.text())
            }
         } catch (syncError) {
            console.error('Error triggering GitHub sync:', syncError)
         }

         return NextResponse.json({
            id: newUser.id,
            name: newUser.name,
            createdAt: newUser.createdAt,
         })
      } catch (writeError) {
         console.error('Error saving user:', writeError)
         // Even if save fails, return the user data
         return NextResponse.json({
            id: newUser.id,
            name: newUser.name,
            createdAt: newUser.createdAt,
         })
      }
   } catch (error) {
      console.error('Error in POST /api/users:', error)
      return NextResponse.json(
         {
            error: 'Internal server error',
            details: error.message,
         },
         { status: 500 },
      )
   }
}
