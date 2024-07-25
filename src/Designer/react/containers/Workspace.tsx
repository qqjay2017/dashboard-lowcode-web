import type { PropsWithChildren } from 'react'
import React, { useMemo, useRef } from 'react'
import { useDesigner } from '../hooks'
import { WorkspaceContext } from '../context'

export interface IWorkspaceProps extends PropsWithChildren {
  id?: string
  title?: string
  description?: string
}

/**
 * Workspace组件往  Engine添加了一个Workspace,并设置为当前的Workspace
 * @param param0
 * @returns
 */
export const Workspace: React.FC<IWorkspaceProps> = ({
  id,
  title,
  description,
  ...props
}) => {
  const oldId = useRef<string>()
  const designer = useDesigner()
  const workspace = useMemo(() => {
    if (!designer)
      return
    if (oldId.current && oldId.current !== id) {
      const old = designer.workbench.findWorkspaceById(oldId.current)
      if (old)
        old.viewport.detachEvents()
    }
    const workspace = {
      id: id || 'index',
      title,
      description,
    }
    designer.workbench.ensureWorkspace(workspace)
    oldId.current = workspace.id
    return workspace
  }, [id, designer])
  console.log(workspace, 'workspaceworkspace')
  return (
    <WorkspaceContext.Provider value={workspace}>
      {props.children}
    </WorkspaceContext.Provider>
  )
}
