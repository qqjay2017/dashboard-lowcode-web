import loader from '@monaco-editor/loader'
import { BASE_URL } from '@/env'

const Registry = {
  cdn: '//cdn.jsdelivr.net/npm',
}

export function setNpmCDNRegistry(registry: string) {
  Registry.cdn = registry
  loader.config({
    'paths': {
      vs: `${window.location.origin}${BASE_URL}unpkg/vs`,
    },
    'vs/nls': {
      availableLanguages: {
        '*': 'zh-cn',
      },
    },
  })
}

export const getNpmCDNRegistry = () => String(Registry.cdn).replace(/\/$/, '')
