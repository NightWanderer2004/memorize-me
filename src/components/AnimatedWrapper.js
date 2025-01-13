'use client'
import { motion } from 'framer-motion'

export default function AnimatedWrapper({ children, className }) {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.99, y: 15 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.99, y: 15 }}
         transition={{ ease: 'backOut', duration: 0.55 }}
         className={className}
      >
         {children}
      </motion.div>
   )
}
