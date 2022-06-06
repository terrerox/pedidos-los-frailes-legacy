import { Magic } from 'magic-sdk'

export default function ({ $config: { magicApiSecret } }, inject) {
  const createMagic = (key) => {
    return typeof window !== 'undefined' && new Magic(key, { locale: 'es' })
  }

  const magic = createMagic(magicApiSecret)
  inject('magic', magic)
}
