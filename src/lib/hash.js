import crypto from 'crypto'

export function hashCode(code) {
   const secret = process.env.HASH_SECRET || 'default-secret-key-for-development'
   const stringCode = String(code)
   return crypto.createHmac('sha256', secret).update(stringCode).digest('hex')
}
