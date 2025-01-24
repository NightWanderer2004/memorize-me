import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
   dest: 'public',
   register: true,
   skipWaiting: true,
})

export default withPWA({
   env: {
      BASE_URL: process.env.BASE_URL,
      HASH_SECRET: process.env.HASH_SECRET,
   },
   images: {
      domains: ['images.unsplash.com'],
   },
})
