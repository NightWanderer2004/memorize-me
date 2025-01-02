import { Manrope } from 'next/font/google'
import '../globals.css'
import { cn } from '@/utils'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata = {
   title: 'Memorize me - Digital Gallery | Creation History',
   description: 'A digital gallery of cherished moments',
}

export default function RootLayout({ children }) {
   return (
      <html lang='en'>
         <body className={cn(manrope.className, 'pt-[50px] bg-[#fefcff]')}>{children}</body>
      </html>
   )
}
