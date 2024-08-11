import { DragMoveEvent, DragStartEvent, DragStopEvent } from '../events'
import type { Engine } from '../models'
import { EventDriver } from '@/designable/shared'

const GlobalState = {
  dragging: false,
  onMouseDownAt: 0,
  startEvent: null,
  moveEvent: null,
}
/**
 * 拖拽事件监听回调,必需用箭头函数
 * 使用了箭头函数，this 的指向会根据其外部上下文而定，而不是事件的触发元素。例如
 */
export class DragDropDriver extends EventDriver<Engine> {
  mouseDownTimer = null

  startEvent: MouseEvent

  onMouseDown = (e: MouseEvent) => {
    if (e.button !== 0 || e.ctrlKey || e.metaKey) {
      return
    }

    const target = e.target as HTMLElement // 断言为 HTMLElement
    if (!target) {
      return
    }
    if (target.isContentEditable || target.contentEditable === 'true') {
      return true
    }
    if (target.closest?.('.monaco-editor'))
      return

    GlobalState.startEvent = e
    GlobalState.dragging = false
    GlobalState.onMouseDownAt = Date.now()

    this.batchAddEventListener('mouseup', this.onMouseUp)
    this.batchAddEventListener('dragend', this.onMouseUp)
    this.batchAddEventListener('dragstart', this.onStartDrag)
    this.batchAddEventListener('mousemove', this.onDistanceChange)
  }

  onMouseUp = (e: MouseEvent) => {
    if (GlobalState.dragging) {
      this.dispatch(
        new DragStopEvent({
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
          target: e.target,
          view: e.view,
        }),
      )
    }
    this.batchRemoveEventListener('mouseup', this.onMouseUp)
    this.batchRemoveEventListener('mousedown', this.onMouseDown)
    this.batchRemoveEventListener('dragover', this.onMouseMove)
    this.batchRemoveEventListener('mousemove', this.onMouseMove)
    this.batchRemoveEventListener('mousemove', this.onDistanceChange)
    GlobalState.dragging = false
  }

  onStartDrag = (e: MouseEvent | DragEvent) => {
    if (GlobalState.dragging)
      return

    GlobalState.startEvent = GlobalState.startEvent || e
    this.batchAddEventListener('dragover', this.onMouseMove)
    this.batchAddEventListener('mousemove', this.onMouseMove)
    this.dispatch(
      new DragStartEvent({
        clientX: GlobalState.startEvent.clientX,
        clientY: GlobalState.startEvent.clientY,
        pageX: GlobalState.startEvent.pageX,
        pageY: GlobalState.startEvent.pageY,
        target: GlobalState.startEvent.target,
        view: GlobalState.startEvent.view,
      }),
    )
    GlobalState.dragging = true
  }

  onDistanceChange = (e: MouseEvent) => {
    /**
     * 欧几里得距离公式,求直线距离
     */
    const distance = Math.sqrt(
      (e.pageX - GlobalState.startEvent.pageX) ** 2
      + (e.pageY - GlobalState.startEvent.pageY) ** 2,
    )
    const timeDelta = Date.now() - GlobalState.onMouseDownAt
    if (timeDelta > 10 && e !== GlobalState.startEvent && distance > 4) {
      this.batchRemoveEventListener('mousemove', this.onDistanceChange)
      this.onStartDrag(e)
    }
  }

  onMouseMove = (e: MouseEvent) => {
    if (
      e.clientX === GlobalState.moveEvent?.clientX
      && e.clientY === GlobalState.moveEvent?.clientY
    ) {
      return
    }
    this.dispatch(
      new DragMoveEvent({
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY,
        target: e.target,
        view: e.view,
      }),
    )
    GlobalState.moveEvent = e
  }

  attach() {
    this.batchAddEventListener('mousedown', this.onMouseDown, true)
  }

  detach() {
    GlobalState.dragging = false
    GlobalState.moveEvent = null
    GlobalState.onMouseDownAt = null
    GlobalState.startEvent = null
    this.batchRemoveEventListener('mousedown', this.onMouseDown, true)
    this.batchRemoveEventListener('dragstart', this.onStartDrag)
    this.batchRemoveEventListener('dragend', this.onMouseUp)
    this.batchRemoveEventListener('dragover', this.onMouseMove)
    this.batchRemoveEventListener('mouseup', this.onMouseUp)
    this.batchRemoveEventListener('mousemove', this.onMouseMove)
    this.batchRemoveEventListener('mousemove', this.onDistanceChange)
    // this.batchRemoveEventListener("mousedown", this.onMouseDown, true);
  }
}
