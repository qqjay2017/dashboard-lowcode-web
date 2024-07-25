import { useOperation } from './useOperation'

export function useOutlineDragon(workspaceId?: string) {
  const operation = useOperation(workspaceId)
  return operation?.outlineDragon
}
