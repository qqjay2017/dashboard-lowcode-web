import { theme } from 'antd'
import type { CustomToken } from '@/dashboard-themes/global-theme'

interface Result extends ReturnType<typeof theme.useToken> {
  token: CustomToken
}

export type TokenResult = Result

function useToken() {
  const result = theme.useToken()
  return result as Result
}

type ComponentsToken = Result['token']['components']

function useComponentToken<K extends keyof ComponentsToken>(componentName: K): ComponentsToken[K] {
  const result = useToken()
  return (result.token.components[componentName] || {}) as ComponentsToken[K]
}

export { useToken, useComponentToken }
