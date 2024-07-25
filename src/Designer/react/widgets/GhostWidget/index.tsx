import React, { useEffect, useRef } from 'react'
import { CursorStatus } from 'designablecore'
import { autorun } from '@formily/reactive'
import { observer } from '@formily/reactive-react'
import { useCursor, useDesigner, usePrefix } from '../../hooks'
import { NodeTitleWidget } from '../NodeTitleWidget'

export const GhostWidget = observer(() => {
  const designer = useDesigner()
  const cursor = useCursor()
  const ref = useRef<HTMLDivElement>()
  const prefix = usePrefix('ghost')
  const draggingNodes = designer.findDraggingNodes()
  const firstNode = draggingNodes[0]
  useEffect(
    () =>
      autorun(() => {
        const transform = `perspective(1px) translate3d(${
          cursor.position?.topClientX - 18
        }px,${cursor.position?.topClientY - 12}px,0) scale(0.8)`
        if (!ref.current)
          return
        ref.current.style.transform = transform
      }),
    [designer, cursor],
  )
  const renderNodes = () => {
    return (
      <span
        style={{
          whiteSpace: 'nowrap',
        }}
      >
        <NodeTitleWidget node={firstNode} />
        {draggingNodes.length > 1 ? '...' : ''}
      </span>
    )
  }
  if (!firstNode)
    return null
  return cursor.status === CursorStatus.Dragging
    ? (
        <div ref={ref} className={prefix}>
          {renderNodes()}
        </div>
      )
    : null
})

GhostWidget.displayName = 'GhostWidget'
