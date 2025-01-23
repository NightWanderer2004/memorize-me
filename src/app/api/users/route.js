import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { hashCode } from '@/lib/hash'

const dataFile = path.join(process.cwd(), 'public', 'data', 'users.json')

// Initialize users.json if it doesn't exist
async function initializeUsersFile() {
   try {
      await fs.access(dataFile)
   } catch {
      await fs.mkdir(path.dirname(dataFile), { recursive: true })
      await fs.writeFile(dataFile, JSON.stringify({ users: [] }))
   }
}

// GET /api/users
export async function GET() {
   await initializeUsersFile()
   const data = await fs.readFile(dataFile, 'utf8')
   return NextResponse.json(JSON.parse(data))
}

// POST /api/users
export async function POST(req) {
   await initializeUsersFile()
   const { name, code } = await req.json()

   if (!name || !code) {
      return NextResponse.json({ error: 'Name and code are required' }, { status: 400 })
   }

   if (!/^\d{4}$/.test(code)) {
      return NextResponse.json({ error: 'Code must be 4 digits' }, { status: 400 })
   }

   const data = JSON.parse(await fs.readFile(dataFile, 'utf8'))
   const hashedCode = hashCode(code)

   // Check if user already exists
   const existingUser = data.users.find(user => user.name.toLowerCase() === name.toLowerCase())
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

   data.users.push(newUser)
   await fs.writeFile(dataFile, JSON.stringify(data, null, 2))

   // Create user directory
   const userDir = path.join(process.cwd(), 'public', 'users', name)
   await fs.mkdir(userDir, { recursive: true })

   // Return user data without the hashed code
   return NextResponse.json({
      id: newUser.id,
      name: newUser.name,
      createdAt: newUser.createdAt,
   })
}
