import type { Engine } from "../models";
import { CursorDragType } from "../models";
import { DragMoveEvent, DragStartEvent, DragStopEvent } from "../events";

export function useTranslateEffect(engine: Engine) {
  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Translate) return;
    const currentWorkspace =
      engine.workbench.currentWorkspace || engine.workbench.activeWorkspace;
    const helper = currentWorkspace?.operation.transformHelper;
    if (!helper) {
      return false;
    }
    const dragNodes = helper.dragNodes;
    if (!dragNodes.length) return;
    helper.dragMove();
    dragNodes.forEach((node) => {
      const element = node.getElement();
      helper.translate(node, (translate) => {
        console.log(translate, "translate");
        element.style.position = "absolute";
        element.style.left = "0px";
        element.style.top = "0px";
        element.style.transform = `translate3d(${translate.x}px,${translate.y}px,0)`;
      });
    });
  });
  engine.subscribeTo(DragStopEvent, (event) => {
    if (engine.cursor.dragType !== CursorDragType.Translate) return;
    const currentWorkspace =
      event.context?.workspace ?? engine.workbench.activeWorkspace;
    const helper = currentWorkspace?.operation.transformHelper;
    if (helper) {
      //
      console.log("拖拽结束++");
      helper.dragEnd();
    }
  });
}
