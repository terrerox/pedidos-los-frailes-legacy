import { Magic } from 'magic-sdk'

// Create client-side Magic instance
const createMagic = (key) => {
  return typeof window !== 'undefined' && new Magic(key)
}

console.log(process.env.MAGIC_PUBLISHABLE_KEY)
export const magic = createMagic(process.env.MAGIC_PUBLISHABLE_KEY)
