import { useLayout } from './useLayout'

export function usePosition() {
  return useLayout()?.position
}
