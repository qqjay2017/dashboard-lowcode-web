import React from 'react'
import { TreeNode } from 'designablecore'
import { Button } from 'antd'
import { usePrefix } from '../../hooks'
import { IconWidget } from '../IconWidget'

export interface ICopyProps {
  node: TreeNode
  style?: React.CSSProperties
}

export const Copy: React.FC<ICopyProps> = ({ node, style }) => {
  const prefix = usePrefix('aux-copy')
  if (node === node.root)
    return null
  return (
    <Button
      className={prefix}
      style={style}
      type="primary"
      onClick={() => {
        TreeNode.clone([node])
      }}
    >
      <IconWidget infer="Clone" />
    </Button>
  )
}

Copy.displayName = 'Copy'
