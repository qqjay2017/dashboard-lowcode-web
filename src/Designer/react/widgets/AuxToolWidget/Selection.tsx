import React, { Fragment } from 'react'
import { observer } from '@formily/reactive-react'
import type { TreeNode } from 'designablecore'
import {
  useCursor,
  useDesigner,
  useMoveHelper,
  usePrefix,
  useSelection,
  useTree,
  useValidNodeOffsetRect,
} from '../../hooks'
import { Helpers } from './Helpers'
import { ResizeHandler } from './ResizeHandler'
import { TranslateHandler } from './TranslateHandler'

export interface ISelectionBoxProps {
  node: TreeNode
  showHelpers: boolean
}

export const SelectionBox: React.FC<ISelectionBoxProps> = (props) => {
  const designer = useDesigner()
  const prefix = usePrefix('aux-selection-box')
  const innerPrefix = usePrefix('aux-selection-box-inner')
  const nodeRect = useValidNodeOffsetRect(props.node)
  const createSelectionStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      zIndex: 4,
    }
    if (nodeRect) {
      baseStyle.transform = `perspective(1px) translate3d(${nodeRect.x}px,${nodeRect.y}px,0)`
      baseStyle.height = nodeRect.height
      baseStyle.width = nodeRect.width
    }
    return baseStyle
  }
  if (!nodeRect)
    return null

  if (!nodeRect.width || !nodeRect.height)
    return null

  const selectionId = {
    [designer.props?.nodeSelectionIdAttrName]: props.node.id,
  }

  return (
    <div {...selectionId} className={prefix} style={createSelectionStyle()}>
      <div className={innerPrefix}></div>
      <ResizeHandler node={props.node} />
      <TranslateHandler node={props.node} />
      {props.showHelpers && (
        <Helpers {...props} node={props.node} nodeRect={nodeRect} />
      )}
    </div>
  )
}

export const Selection = observer(() => {
  const selection = useSelection()
  const tree = useTree()
  const cursor = useCursor()
  const viewportMoveHelper = useMoveHelper()
  if (cursor.status !== 'NORMAL' && viewportMoveHelper.touchNode)
    return null
  return (
    <>
      {selection.selected.map((id) => {
        const node = tree.findById(id)
        if (!node)
          return null
        if (node.hidden)
          return null
        return (
          <SelectionBox
            key={id}
            node={node}
            showHelpers={selection.selected.length === 1}
          />
        )
      })}
    </>
  )
})

Selection.displayName = 'Selection'
