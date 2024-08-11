import { DragMoveEvent, DragStartEvent, DragStopEvent, MouseMoveEvent } from '../events'
import { CursorStatus, type Engine } from '../models'
import { requestIdle } from '@/designable/shared'

export function useCursorEffect(engine: Engine) {
    engine.subscribeTo(DragStartEvent, (event) => {
        engine.cursor.setStatus(CursorStatus.DragStart)
        engine.cursor.setDragStartPosition(event.data)
    })
    engine.subscribeTo(DragMoveEvent, (event) => {
        engine.cursor.setStatus(CursorStatus.Dragging)
        engine.cursor.setPosition(event.data)
    })
    engine.subscribeTo(DragStopEvent, (event) => {
        engine.cursor.setStatus(CursorStatus.DragStop)
        engine.cursor.setDragEndPosition(event.data)
        engine.cursor.setDragStartPosition(null)
        requestIdle(() => {
            engine.cursor.setStatus(CursorStatus.Normal)
        })
    })

    engine.subscribeTo(MouseMoveEvent, (event) => {
        engine.cursor.setStatus(
            engine.cursor.status === CursorStatus.Dragging
                || engine.cursor.status === CursorStatus.DragStart
                ? engine.cursor.status
                : CursorStatus.Normal,
        )
        if (engine.cursor.status === CursorStatus.Dragging)
            return
        engine.cursor.setPosition(event.data)
    })
}
