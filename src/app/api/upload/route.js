import { writeFile, mkdir, readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function POST(request) {
   try {
      const data = await request.formData()
      const username = data.get('username')
      const year = data.get('year')
      const month = data.get('month')
      const photos = data.getAll('photos')

      if (!username || !photos.length || !year || !month) {
         return NextResponse.json({ error: 'Username, year, month and photos are required' }, { status: 400 })
      }

      const uploadDir = path.join(process.cwd(), 'public', 'uploads', username.toLowerCase(), year, month.toLowerCase())
      await mkdir(uploadDir, { recursive: true })

      const savedFiles = []
      for (const photo of photos) {
         const bytes = await photo.arrayBuffer()
         const buffer = Buffer.from(bytes)
         const filename = `${Date.now()}-${photo.name}`
         const filepath = path.join(uploadDir, filename)
         await writeFile(filepath, buffer)
         savedFiles.push(`/uploads/${username.toLowerCase()}/${year}/${month.toLowerCase()}/${filename}`)
      }

      // Update users.json with new photo paths
      const usersPath = path.join(process.cwd(), 'public', 'data', 'users.json')
      const usersData = JSON.parse(await readFile(usersPath, 'utf8'))

      const user = usersData.users.find(u => u.name.toLowerCase() === username.toLowerCase())
      if (!user) {
         return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      if (!user.photos) user.photos = []
      user.photos.push(
         ...savedFiles.map(url => ({
            url,
            date: new Date().toISOString(),
         })),
      )

      await writeFile(usersPath, JSON.stringify(usersData, null, 3))
      return NextResponse.json({ urls: savedFiles })
   } catch (error) {
      console.error('Upload error:', error)
      return NextResponse.json({ error: 'Error uploading files' }, { status: 500 })
   }
}
