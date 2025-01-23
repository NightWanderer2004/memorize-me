import { Manrope } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const manrope = Manrope({ subsets: ['latin'] })
const APP_NAME = 'Memorize me'
const APP_DEFAULT_TITLE = 'Memorize me'
const APP_DESCRIPTION = 'A digital gallery of cherished moments'

export const metadata = {
   applicationName: APP_NAME,
   title: {
      default: APP_DEFAULT_TITLE,
   },
   description: APP_DESCRIPTION,
   keywords: 'memories, gallery, photos, albums',
   manifest: '/manifest.json',
   appleWebApp: {
      capable: true,
      display: 'fullscreen',
      statusBarStyle: 'black-translucent',
      title: APP_DEFAULT_TITLE,
   },
}
export const viewport = {
   width: 'device-width',
   initialScale: 1,
   maximumScale: 1,
   viewportFit: 'cover',
   userScalable: false,
}

export default function RootLayout({ children }) {
   return (
      <html lang='en' suppressHydrationWarning>
         <head>
            <meta name='mobile-web-app-capable' content='yes' />
            <link rel='apple-touch-icon' href='/favicon/apple-touch-icon.png' />
            <link rel='icon' href='/favicon/favicon.ico' sizes='any' />
            <link rel='icon' href='/favicon/icon.svg' type='image/svg+xml' />
         </head>
         <body className={cn(manrope.className, 'pt-safe-offset-6 lg:pt-[50px] bg-back')}>{children}</body>
      </html>
   )
}
