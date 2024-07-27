import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events'
import {
  ClosestPosition,
  CursorDragType,
  CursorType,
  type Engine,
  TreeNode,
} from '../models'
import { sizeFormat } from '@/utils'
import { Point } from '@/designable/shared'

export function useDragDropEffect(engine: Engine) {
  engine.subscribeTo(DragStartEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal)
      return
    const target = event.data.target as HTMLElement
    const el = target?.closest(`
       *[${engine.props.nodeIdAttrName}],
       *[${engine.props.sourceIdAttrName}],
       *[${engine.props.outlineNodeIdAttrName}]
      `)
    const handler = target?.closest(
      `*[${engine.props.nodeDragHandlerAttrName}]`,
    )
    const helper = handler?.closest(
      `*[${engine.props.nodeSelectionIdAttrName}]`,
    )

    if (!el?.getAttribute && !handler)
      return

    const sourceId = el?.getAttribute(engine.props.sourceIdAttrName)
    const outlineId = el?.getAttribute(engine.props.outlineNodeIdAttrName)
    const handlerId = helper?.getAttribute(
      engine.props.nodeSelectionIdAttrName,
    )
    const nodeId = el?.getAttribute(engine.props.nodeIdAttrName)
    console.log(event, nodeId, 'DragStartEvent')
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      if (nodeId || outlineId || handlerId) {
        const node = engine.findNodeById(outlineId || nodeId || handlerId)

        if (node) {
          if (!node.allowDrag())
            return
          if (node === node.root)
            return
          const validSelected = engine
            .getAllSelectedNodes()
            .filter(node => node.allowDrag())
          if (validSelected.includes(node)) {
            moveHelper.dragStart({ dragNodes: TreeNode.sort(validSelected) })
          }
          else {
            moveHelper.dragStart({ dragNodes: [node] })
          }
        }
      }
      else if (sourceId) {
        const sourceNode = engine.findNodeById(sourceId)

        if (sourceNode) {
          moveHelper.dragStart({ dragNodes: [sourceNode] })
        }
      }
    })
    engine.cursor.setStyle('move')
  })

  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal)
      return
    if (engine.cursor.dragType !== CursorDragType.Move)
      return
    const target = event.data.target as HTMLElement
    const el = target?.closest(`
      *[${engine.props.nodeIdAttrName}],
      *[${engine.props.outlineNodeIdAttrName}]
    `)

    const point = new Point(event.data.topClientX, event.data.topClientY)
    const nodeId = el?.getAttribute(engine.props.nodeIdAttrName)

    const outlineId = el?.getAttribute(engine.props.outlineNodeIdAttrName)
    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      const dragNodes = moveHelper.dragNodes
      const tree = operation.tree
      if (!dragNodes.length)
        return
      const touchNode = tree.findById(outlineId || nodeId)
      console.log('🚀 ~ engine.workbench.eachWorkspace ~ touchNode:', point, touchNode)

      moveHelper.dragMove({
        point,
        touchNode,
      })
    })
  })

  engine.subscribeTo(DragStopEvent, () => {
    if (engine.cursor.type !== CursorType.Normal)
      return
    if (engine.cursor.dragType !== CursorDragType.Move)
      return

    engine.workbench.eachWorkspace((currentWorkspace) => {
      const operation = currentWorkspace.operation
      const moveHelper = operation.moveHelper
      const dragNodes = moveHelper.dragNodes
      const closestNode = moveHelper.closestNode
      const closestDirection = moveHelper.closestDirection
      const selection = operation.selection
      if (!dragNodes.length)
        return

      if (dragNodes.length && closestNode && closestDirection) {
        if (
          closestDirection === ClosestPosition.After
          || closestDirection === ClosestPosition.Under
        ) {
          if (closestNode.allowSibling(dragNodes)) {
            // selection.batchSafeSelect(
            //     closestNode.insertAfter(
            //         ...TreeNode.filterDroppable(dragNodes, closestNode.parent),
            //     ),
            // )
          }
        }
        else if (
          closestDirection === ClosestPosition.Before
          || closestDirection === ClosestPosition.Upper
        ) {
          if (closestNode.allowSibling(dragNodes)) {
            // selection.batchSafeSelect(
            //     closestNode.insertBefore(
            //         ...TreeNode.filterDroppable(dragNodes, closestNode.parent),
            //     ),
            // )
          }
        }
        else if (
          closestDirection === ClosestPosition.Inner
          || closestDirection === ClosestPosition.InnerAfter
        ) {
          if (closestNode.allowAppend(dragNodes)) {
            const viewport = currentWorkspace.viewport
            const dragEndOffsetPoint = viewport.getOffsetPoint(
              new Point(
                engine.cursor.position.topClientX,
                engine.cursor.position.topClientY,
              ),
            )
            console.log(dragEndOffsetPoint.x, viewport.width, 'dragEndOffsetPoint.x')
            const decoratorProps = {
              w: 3,
              h: 3,
              padding: [0, 0, 0, 0],
              x: sizeFormat(dragEndOffsetPoint.x / (viewport.width / 12), 2),
              y: sizeFormat(dragEndOffsetPoint.y / (viewport.height / 12), 2),
            }
            console.log(decoratorProps, 'decoratorProps')

            selection.batchSafeSelect(
              closestNode.append(
                ...TreeNode.filterDroppable(dragNodes.map((node) => {
                  node.props['x-decorator-props'] = node.props['x-decorator-props'] || {}
                  node.props['x-decorator-props'] = {
                    ...decoratorProps,
                    ...(node.props['x-decorator-props']),
                  }
                  return node
                }), closestNode),
              ),
            )
            moveHelper.dragDrop({ dropNode: closestNode })
          }
        }
        else if (closestDirection === ClosestPosition.InnerBefore) {
          if (closestNode.allowAppend(dragNodes)) {
            // selection.batchSafeSelect(
            //     closestNode.prepend(
            //         ...TreeNode.filterDroppable(dragNodes, closestNode),
            //     ),
            // )
            moveHelper.dragDrop({ dropNode: closestNode })
          }
        }
      }
      moveHelper.dragEnd()
    })
    engine.cursor.setStyle('')
  })
}
