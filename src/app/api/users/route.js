import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { hashCode } from '@/lib/hash'

const dataFile = path.join(process.cwd(), 'public', 'data', 'users.json')

// Initialize users.json if it doesn't exist
async function initializeUsersFile() {
   try {
      await fs.access(dataFile)
   } catch (error) {
      await fs.mkdir(path.dirname(dataFile), { recursive: true })
      await fs.writeFile(dataFile, JSON.stringify({ users: [] }))
   }
}

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

// Write users to file
async function writeUsers(users) {
   try {
      await fs.writeFile(dataFile, JSON.stringify({ users }, null, 2))
   } catch (error) {
      console.error('Error writing users:', error)
      throw new Error('Failed to save user data')
   }
}

// GET /api/users
export async function GET() {
   await initializeUsersFile()
   const users = await getUsers()
   return NextResponse.json({ users })
}

// POST /api/users
export async function POST(req) {
   try {
      await initializeUsersFile()
      const { name, code } = await req.json()

      if (!name || !code) {
         return NextResponse.json({ error: 'Name and code are required' }, { status: 400 })
      }

      if (!/^\d{4}$/.test(code)) {
         return NextResponse.json({ error: 'Code must be 4 digits' }, { status: 400 })
      }

      const users = await getUsers()
      const hashedCode = hashCode(code)

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

      const newUser = {
         id: Date.now().toString(),
         name,
         code: hashedCode,
         createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      await writeUsers(users)

      // Create user directory
      const userDir = path.join(process.cwd(), 'public', 'users', name)
      await fs.mkdir(userDir, { recursive: true })

      // Return user data without the hashed code
      return NextResponse.json({
         id: newUser.id,
         name: newUser.name,
         createdAt: newUser.createdAt,
      })
   } catch (error) {
      console.error('Error in POST /api/users:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
   }
}
