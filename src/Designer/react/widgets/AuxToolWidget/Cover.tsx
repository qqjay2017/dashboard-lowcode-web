import React, { Fragment } from 'react'
import { observer } from '@formily/reactive-react'
import type { TreeNode } from '@designable/core'
import { ClosestPosition, CursorStatus } from '@designable/core'
import cls from 'classnames'
import {
  useCursor,
  useDragon,
  usePrefix,
  useValidNodeOffsetRect,
  useViewport,
} from '../../hooks'

interface ICoverRectProps {
  node: TreeNode
  dragging?: boolean
  dropping?: boolean
}

const CoverRect: React.FC<ICoverRectProps> = (props) => {
  const prefix = usePrefix('aux-cover-rect')
  const rect = useValidNodeOffsetRect(props.node)
  const createCoverStyle = () => {
    const baseStyle: React.CSSProperties = {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    }
    if (rect) {
      baseStyle.transform = `perspective(1px) translate3d(${rect.x}px,${rect.y}px,0)`
      baseStyle.height = rect.height
      baseStyle.width = rect.width
    }
    return baseStyle
  }

  return (
    <div
      className={cls(prefix, {
        dragging: props.dragging,
        dropping: props.dropping,
      })}
      style={createCoverStyle()}
    >
    </div>
  )
}

export const Cover = observer(() => {
  const viewportDragon = useDragon()
  const viewport = useViewport()
  const cursor = useCursor()
  const renderDropCover = () => {
    if (
      !viewportDragon.closestNode
      || !viewportDragon.closestNode?.allowAppend(viewportDragon.dragNodes)
      || viewportDragon.closestDirection !== ClosestPosition.Inner
    ) {
      return null
    }
    return <CoverRect node={viewportDragon.closestNode} dropping />
  }
  if (cursor.status !== CursorStatus.Dragging)
    return null

  return (
    <>
      {viewportDragon.dragNodes.map((node) => {
        if (!node)
          return null
        if (!viewport.findElementById(node.id))
          return null
        return <CoverRect key={node.id} node={node} dragging />
      })}
      {renderDropCover()}
    </>
  )
})

Cover.displayName = 'Cover'