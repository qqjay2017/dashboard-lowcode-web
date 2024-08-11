import { set } from "lodash-es";
import type { Engine, TreeNode } from "../models";
import { CursorDragType } from "../models";
import { DragMoveEvent, DragStopEvent } from "../events";
import { sizeFormat } from "@/utils";
import {
  calcElementStyleSize,
  calcElementTranslate,
} from "@/designable/shared";

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
      engine.workbench.currentWorkspace || engine.workbench.activeWorkspace;
    const helper = currentWorkspace?.operation?.transformHelper;
    const root = currentWorkspace?.operation.tree.root;
    if (helper && root) {
      const dragNodes = helper.dragNodes;
      // 讲style反算回props
      setNewPosition(dragNodes, {
        colWidth: root?.props?.designWidth / 12,
        rowHeight: root?.props?.designHeight / 12,
      });

      console.log("拖拽结束++");
      helper.dragEnd();
    }
  });
}

export function setNewPosition(
  dragNodes: TreeNode[] = [],
  {
    colWidth,
    rowHeight,
  }: {
    colWidth: number;
    rowHeight: number;
  }
) {
  dragNodes.forEach((node) => {
    if (!node || !node.getElement) {
      return;
    }
    const element = node.getElement();
    const transform = calcElementTranslate(element);

    console.log(element.getBoundingClientRect(), "www");

    if (!transform) {
      return;
    }

    const newPosition = {
      ...node.props?.["x-decorator-props"],
      x: sizeFormat(transform.x / colWidth, 2),
      y: sizeFormat(transform.y / rowHeight, 2),
    };
    const { width, height } = calcElementStyleSize(element);
    console.log(width, height, "width, height ");
    if (width) {
      newPosition.w = sizeFormat(width / colWidth, 2);
    }
    if (height) {
      newPosition.h = sizeFormat(height / rowHeight, 2);
    }
    set(node, "props.x-decorator-props", newPosition);
  });
}
