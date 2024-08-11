import { action, define, observable } from '@formily/reactive'
import { DragNodeEvent, DropNodeEvent } from '../events'
import type { Operation } from './Operation'
import { TreeNode } from './TreeNode'
import type { Viewport } from './Viewport'
import { CursorDragType } from './Cursor'
import type { IPoint, Rect } from '@/designable/shared'

export interface IMoveHelperProps {
    operation: Operation
}

export interface IMoveHelperDragStartProps {
    dragNodes: TreeNode[]
}

export interface IMoveHelperDragDropProps {
    dropNode: TreeNode
}
export interface IMoveHelperDragMoveProps {
    touchNode: TreeNode
    point: IPoint
}

export class MoveHelper {
    operation: Operation

    rootNode: TreeNode

    dragNodes: TreeNode[] = []

    touchNode: TreeNode = null

    closestNode: TreeNode = null

    activeViewport: Viewport = null

    viewportClosestRect: Rect = null

    viewportClosestOffsetRect: Rect = null

    dragging = false

    constructor(props: IMoveHelperProps) {
        this.operation = props.operation
        this.rootNode = this.operation.tree
        this.makeObservable()
    }

    trigger(event: any) {
        if (this.operation) {
            return this.operation.dispatch(event)
        }
    }

    get hasDragNodes() {
        return this.dragNodes.length > 0
    }

    get cursor() {
        return this.operation.engine.cursor
    }

    get viewport() {
        return this.operation.workspace.viewport
    }

    dragStart(props: IMoveHelperDragStartProps) {
        /**
         * 过滤合法和拖拽节点
         */
        const nodes = TreeNode.filterDraggable(props?.dragNodes)

        if (nodes.length) {
            this.dragNodes = nodes
            this.trigger(
                new DragNodeEvent({
                    target: this.operation.tree,
                    source: this.dragNodes,
                }),
            )
            this.viewport.cacheElements()
            this.cursor.setDragType(CursorDragType.Move)
            this.dragging = true
        }
    }

    dragMove(props: IMoveHelperDragMoveProps) {
        const { point, touchNode } = props
        if (!this.dragging)
            return
        if (this.viewport.isPointInViewport(point, false)) {
            this.activeViewport = this.viewport
            this.touchNode = touchNode
            this.closestNode = this.calcClosestNode(point, this.viewport)
        }
        else {
            this.activeViewport = null
            this.touchNode = null
        }
        if (!this.activeViewport)
            return

        if (this.viewport.mounted) {
            // 计算偏移矩形
            this.viewportClosestOffsetRect = this.calcClosestOffsetRect(
                this.viewport,
            )
        }
    }

    dragDrop(props: IMoveHelperDragDropProps) {
        this.trigger(
            new DropNodeEvent({
                target: this.operation.tree,
                source: props?.dropNode,
            }),
        )
    }

    dragEnd() {
        this.dragging = false
        this.dragNodes = []
        this.touchNode = null
        this.closestNode = null
        this.activeViewport = null

        this.viewportClosestOffsetRect = null
        this.viewportClosestRect = null
        this.viewport.clearCache()
    }

    makeObservable() {
        define(this, {
            dragging: observable.ref,
            dragNodes: observable.ref,
            touchNode: observable.ref,
            closestNode: observable.ref,
            viewportClosestOffsetRect: observable.ref,
            viewportClosestRect: observable.ref,
            dragStart: action,
            dragMove: action,
            dragEnd: action,
        })
    }

    /**
     * 目前只允许放在根
     * @param point
     * @param viewport
     * @returns
     */
    calcClosestNode(point: IPoint, viewport: Viewport): TreeNode {
        if (this.touchNode) {
            return this.rootNode
        }
        else {
            return null
        }
    }

    calcClosestRect(viewport: Viewport): Rect {
        const closestNode = this.closestNode
        if (!closestNode)
            return
        const closestRect = viewport.getValidNodeRect(closestNode)
        return closestRect
    }

    calcClosestOffsetRect(viewport: Viewport): Rect {
        const closestNode = this.closestNode
        if (!closestNode)
            return
        const closestRect = viewport.getValidNodeOffsetRect(closestNode)
        return closestRect
    }
}
