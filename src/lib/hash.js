import crypto from 'crypto'

export function hashCode(code) {
   const secret = process.env.HASH_SECRET
   return crypto.createHmac('sha256', secret).update(code).digest('hex')
}
