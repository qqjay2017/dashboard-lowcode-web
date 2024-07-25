import { useOperation } from './useOperation'

export function useDragon(workspaceId?: string) {
  const operation = useOperation(workspaceId)
  return operation?.viewportDragon
}
