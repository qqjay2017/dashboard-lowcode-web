import type { IDesignerRegistry } from 'designablecore'
import { GlobalRegistry } from 'designablecore'
import { globalThisPolyfill } from 'designableshared'

export function useRegistry(): IDesignerRegistry {
  return (globalThisPolyfill as any).__DESIGNER_REGISTRY__ || GlobalRegistry
}
