import React from 'react'
import type { TreeNode } from '@designable/core'
import { observer } from '@formily/reactive-react'
import { Button } from 'antd'
import { IconWidget } from '../IconWidget'
import { useDesigner, usePrefix } from '../../hooks'

export interface IDragHandlerProps {
  node: TreeNode
  style?: React.CSSProperties
}

export const DragHandler: React.FC<IDragHandlerProps> = observer(
  ({ node, style }) => {
    const designer = useDesigner()
    const prefix = usePrefix('aux-drag-handler')
    if (node === node.root || !node.allowDrag())
      return null
    const handlerProps = {
      [designer.props.nodeDragHandlerAttrName]: 'true',
    }
    return (
      <Button {...handlerProps} className={prefix} style={style} type="primary">
        <IconWidget infer="Move" />
      </Button>
    )
  },
)

DragHandler.displayName = 'DragHandler'
