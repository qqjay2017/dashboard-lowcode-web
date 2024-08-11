// import { Point } from '@designable/shared'
import { get } from "lodash-es";
import { message } from "antd";
import type { Engine } from "../models";
import { CursorDragType, CursorType, TreeNode } from "../models";
import {
  DragMoveEvent,
  DragStartEvent,
  DragStopEvent,
  ViewportScrollEvent,
  // ViewportScrollEvent,
} from "../events";
import { Point } from "@/designable/shared";
import { sizeFormat } from "@/utils";

export function useDragDropEffect(engine: Engine) {
  /**
   * 开始拖拽
   */
  engine.subscribeTo(DragStartEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) {
      return;
    }
    const target = event.data.target as HTMLElement;
    const el = target?.closest(`
       *[${engine.props.nodeIdAttrName}],
       *[${engine.props.sourceIdAttrName}]
      `);
    if (!el?.getAttribute) return;
    const sourceId = el?.getAttribute(engine.props.sourceIdAttrName);
    const nodeId = el?.getAttribute(engine.props.nodeIdAttrName);
    if (nodeId) {
      const node = engine.findNodeById(nodeId);

      if (node) {
        if (!node.allowDrag()) return;
        if (node === node.root) return;

        const transformHelper =
          engine.workbench?.currentWorkspace?.operation?.transformHelper;

        if (!transformHelper) {
          return;
        }

        transformHelper.dragStart({
          dragNodes: [node],
          type: "translate",
        });
      }
    } else if (sourceId) {
      const operation = engine.workbench?.currentWorkspace?.operation;
      if (!operation) {
        return;
      }
      const moveHelper = operation.moveHelper;
      const sourceNode = engine.findNodeById(sourceId);

      if (sourceNode) {
        moveHelper.dragStart({ dragNodes: [sourceNode] });
      }
    }
    engine.cursor.setStyle("move");
  });
  engine.subscribeTo(DragMoveEvent, (event) => {
    if (engine.cursor.type !== CursorType.Normal) return;
    if (engine.cursor.dragType !== CursorDragType.Move) return;
    const target = event.data.target as HTMLElement;
    const el = target?.closest(`
      *[${engine.props.nodeIdAttrName}]
    `);
    const point = new Point(event.data.topClientX, event.data.topClientY);
    const nodeId = el?.getAttribute(engine.props.nodeIdAttrName);

    const currentWorkspace = engine.workbench.currentWorkspace;

    if (!currentWorkspace) {
      return;
    }
    const operation = currentWorkspace.operation;
    const moveHelper = operation.moveHelper;

    if (!moveHelper) {
      return false;
    }
    const dragNodes = moveHelper.dragNodes;
    const tree = operation.tree;

    if (!dragNodes || !dragNodes.length) return;

    const touchNode = tree.findById(nodeId);
    moveHelper.dragMove({
      point,
      touchNode,
    });
  });
  // /**
  //  * 拖动时候滚动
  //  */
  // engine.subscribeTo(ViewportScrollEvent, (event) => {

  // })

  engine.subscribeTo(DragStopEvent, (event) => {
    engine.cursor.setStyle("");

    if (engine.cursor.type !== CursorType.Normal) return;
    if (engine.cursor.dragType !== CursorDragType.Move) return;
    const currentWorkspace = engine.workbench.currentWorkspace;

    if (!currentWorkspace) {
      return;
    }

    const operation = currentWorkspace.operation;

    const moveHelper = operation.moveHelper;
    const dragNodes = moveHelper.dragNodes;
    const closestNode = moveHelper.closestNode;

    if (!dragNodes.length) return;
    if (dragNodes.length && closestNode) {
      // 添加子节点
      const { clientX, clientY } = event.data;
      const rect = currentWorkspace.viewport.rect;
      const _left = sizeFormat(
        (clientX - rect.left) / currentWorkspace.viewport.viewportColWidth
      );
      const _top = sizeFormat(
        (clientY - rect.top) / currentWorkspace.viewport.viewportRowHeight
      );

      if (_left < 0 || _left > 12) {
        message.warning("请放置在画布容器内");
        return false;
      }
      if (_top < 0 || _top > 12) {
        message.warning("请放置在画布容器内");
        return false;
      }

      const maxIndex = closestNode?.children?.length
        ? closestNode.children.reduce((memo, cur) => {
            const curIndex = get(cur, "props.x-decorator-props.zIndex", 1) || 1;

            return Math.max(curIndex, memo);
          }, 1)
        : 0;

      const decoratorProps = {
        zIndex: maxIndex + 1,
        x: _left,
        y: _top,
      };

      const newNodes = TreeNode.filterDroppable(dragNodes, closestNode).map(
        (node) => {
          node.props["x-decorator-props"] =
            node.props["x-decorator-props"] || {};
          node.props["x-decorator-props"] = {
            w: 3,
            h: 3,
            padding: "0px 0px 0px 0px",

            ...node.props["x-decorator-props"],
            ...decoratorProps,
          };

          return node;
        }
      );
      console.log(newNodes, event, "newNodes");

      console.log(clientX - rect.left, "left", clientY - rect.top, "top");
      closestNode.append(...newNodes);
      // TODO  放置后选择
      // selection.batchSafeSelect(
      //     closestNode.append(
      //         ...TreeNode.filterDroppable(dragNodes, closestNode)
      //     )
      // )
      moveHelper.dragDrop({ dropNode: closestNode });
    }

    moveHelper.dragEnd();
  });
}
