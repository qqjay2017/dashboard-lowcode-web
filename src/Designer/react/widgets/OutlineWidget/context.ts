import type { TreeNode } from 'designablecore'
import type React from 'react'
import { createContext } from 'react'

interface INodeContext {
  renderTitle?: (node: TreeNode) => React.ReactNode
  renderActions?: (node: TreeNode) => React.ReactNode
}

export const NodeContext = createContext<INodeContext>(null)
