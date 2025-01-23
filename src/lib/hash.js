import crypto from 'crypto'

export function hashCode(code) {
   // Make sure we have a secret
   const secret = process.env.HASH_SECRET || 'default-secret-key-for-development'

   // Ensure code is a string
   const stringCode = String(code)

   // Create hash
   return crypto.createHmac('sha256', secret).update(stringCode).digest('hex')
}
