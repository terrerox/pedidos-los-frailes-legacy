import { Magic } from 'magic-sdk'

export default function ({ $config: { magicApiSecret, baseURL } }, inject) {
  const createMagic = (key) => {
    return typeof window !== 'undefined' && new Magic(key)
  }

  console.log({ baseURL, magicApiSecret })
  const magic = createMagic(magicApiSecret)
  inject('magic', magic)
}
