import { Manrope } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata = {
   title: 'Memorize me',
   description: 'A digital gallery of cherished moments',
}

export default function RootLayout({ children }) {
   return (
      <html lang='en'>
         <body className={cn(manrope.className, 'pt-[50px] pb-[30px] bg-[#fefcff]')}>{children}</body>
      </html>
   )
}
