import { action, define, observable } from "@formily/reactive";

import type { Operation } from "./Operation";
import { TreeNode } from "./TreeNode";

import { CursorDragType } from "./Cursor";
import { SnapLine } from "./SnapLine";
import type { AroundSpaceBlock } from "./SpaceBlock";
import { SpaceBlock } from "./SpaceBlock";
import {
  Point,
  Rect,
  calcBoundingRect,
  calcClosestEdges,
  calcCombineSnapLineSegment,
  calcDistanceOfSnapLineToEdges,
  calcEdgeLinesOfRect,
  calcElementTranslate,
  calcRectMinDistance,
  calcSpaceBlockOfRect,
  isEqualRect,
  isLineSegment,
} from "@/designable/shared";
import type { ILineSegment, IPoint, IRect, ISize } from "@/designable/shared";

export interface ITransformHelperProps {
  operation: Operation;
}

export type TransformHelperType =
  | "translate"
  | "resize"
  | "rotate"
  | "scale"
  | "round";

export type ResizeDirection =
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "center-top"
  | "center-bottom"
  | "right-top"
  | "right-bottom"
  | "right-center"
  | (string & {});

export interface ITransformHelperDragStartProps {
  type: TransformHelperType;
  direction?: ResizeDirection;
  dragNodes: TreeNode[];
}

export class TransformHelper {
  operation: Operation;

  type: TransformHelperType;

  direction: ResizeDirection;

  dragNodes: TreeNode[] = [];
  aroundSpaceBlocks: AroundSpaceBlock = null;
  rulerSnapLines: SnapLine[] = [];

  aroundSnapLines: SnapLine[] = [];

  viewportRectsStore: Record<string, Rect> = {};

  dragStartTranslateStore: Record<string, IPoint> = {};

  dragStartSizeStore: Record<string, ISize> = {};

  draggingNodesRect: Rect;

  cacheDragNodesReact: Rect;

  dragStartNodesRect: IRect = null;
  /**
   * 正在捕捉
   */
  snapping = false;
  /**
   *已经捕捉
   */
  snapped = false;
  dragging = false;

  constructor(props: ITransformHelperProps) {
    this.operation = props.operation;
    this.makeObservable();
  }

  get measurerSpaceBlocks(): SpaceBlock[] {
    const results: SpaceBlock[] = [];

    if (!this.dragging || !this.snapped) return [];
    for (const type in this.aroundSpaceBlocks) {
      if (this.aroundSpaceBlocks[type])
        results.push(this.aroundSpaceBlocks[type]);
    }

    return results;
  }

  get thresholdSpaceBlocks(): SpaceBlock[] {
    const results = [];
    if (!this.dragging) return [];
    for (const type in this.aroundSpaceBlocks) {
      const block = this.aroundSpaceBlocks[type];
      if (!block.snapLine) return [];
      if (block.snapLine.distance !== 0) return [];
      if (block.isometrics.length) {
        results.push(block);
        results.push(...block.isometrics);
      }
    }
    return results;
  }

  get tree() {
    return this.operation.tree;
  }

  get cursor() {
    return this.operation.engine.cursor;
  }

  get viewport() {
    return this.operation.workspace.viewport;
  }

  get deltaX() {
    return (
      this.cursor.dragStartToCurrentDelta.clientX /
      this.operation.workspace.viewport.designScale
    );
  }

  get deltaY() {
    return (
      this.cursor.dragStartToCurrentDelta.clientY /
      this.operation.workspace.viewport.designScale
    );
  }

  get cursorPosition() {
    const position = this.cursor.position;
    return this.operation.workspace.viewport.getOffsetPoint(
      new Point(position.clientX, position.clientY)
    );
  }

  get cursorDragNodesRect() {
    if (this.type === "translate") {
      return new Rect(
        this.cursorPosition.x - this.dragStartCursorOffset.x,
        this.cursorPosition.y - this.dragStartCursorOffset.y,
        this.dragNodesRect.width,
        this.dragNodesRect.height
      );
    } else if (this.type === "resize") {
      const dragNodesRect = this.dragStartNodesRect;
      const deltaX = this.cursor.dragStartToCurrentDelta.clientX;
      const deltaY = this.cursor.dragStartToCurrentDelta.clientY;
      switch (this.direction) {
        case "left-top":
          return new Rect(
            this.cursorPosition.x - this.dragStartCursorOffset.x,
            this.cursorPosition.y - this.dragStartCursorOffset.y,
            dragNodesRect.width - deltaX,
            dragNodesRect.height - deltaY
          );
        case "left-center":
          return new Rect(
            this.cursorPosition.x - this.dragStartCursorOffset.x,
            dragNodesRect.y,
            dragNodesRect.width - deltaX,
            dragNodesRect.height
          );
        case "left-bottom":
          return new Rect(
            this.cursorPosition.x - this.dragStartCursorOffset.x,
            dragNodesRect.y,
            dragNodesRect.width - deltaX,
            dragNodesRect.height - deltaY
          );
        case "center-top":
          return new Rect(
            dragNodesRect.x,
            this.cursorPosition.y - this.dragStartCursorOffset.y,
            dragNodesRect.width,
            dragNodesRect.height - deltaY
          );
        case "center-bottom":
          return new Rect(
            dragNodesRect.x,
            dragNodesRect.y,
            dragNodesRect.width,
            dragNodesRect.height + deltaY
          );
        case "right-top":
          return new Rect(
            dragNodesRect.x,
            this.cursorPosition.y - this.dragStartCursorOffset.y,
            dragNodesRect.width + deltaX,
            dragNodesRect.height - deltaY
          );
        case "right-center":
          return new Rect(
            dragNodesRect.x,
            dragNodesRect.y,
            dragNodesRect.width + deltaX,
            dragNodesRect.height
          );
        case "right-bottom":
          return new Rect(
            dragNodesRect.x,
            dragNodesRect.y,
            dragNodesRect.width + deltaX,
            dragNodesRect.height - deltaY
          );
      }
    }
  }

  get cursorDragNodesEdgeLines() {
    return calcEdgeLinesOfRect(this.cursorDragNodesRect);
  }

  get dragNodesRect() {
    if (this.draggingNodesRect) return this.draggingNodesRect;
    return calcBoundingRect(
      this.dragNodes.map((node) => node.getValidElementOffsetRect())
    );
  }

  get dragNodesEdgeLines() {
    return calcEdgeLinesOfRect(this.dragNodesRect);
  }

  get cursorOffset() {
    return new Point(
      this.cursorPosition.x - this.dragNodesRect.x,
      this.cursorPosition.y - this.dragNodesRect.y
    );
  }

  get dragStartCursor() {
    const position = this.operation.engine.cursor.dragStartPosition;
    return this.operation.workspace.viewport.getOffsetPoint(
      new Point(position.clientX, position.clientY)
    );
  }

  get dragStartCursorOffset() {
    return new Point(
      this.dragStartCursor.x - this.dragStartNodesRect.x,
      this.dragStartCursor.y - this.dragStartNodesRect.y
    );
  }

  get closestSnapLines() {
    if (!this.dragging) return [];
    const results: SnapLine[] = [];
    const cursorDragNodesEdgeLines = this.cursorDragNodesEdgeLines;

    this.thresholdSnapLines.forEach((line) => {
      const distance = calcDistanceOfSnapLineToEdges(
        line,
        cursorDragNodesEdgeLines
      );

      if (distance < TransformHelper.threshold) {
        const existed = results.findIndex(
          (l) =>
            l.distance > distance &&
            l.distance > 0 &&
            l.direction === line.direction
        );
        if (existed > -1) {
          results.splice(existed, 1);
        }

        results.push(line);
      }
    });

    return results;
  }

  get thresholdSnapLines(): any[] {
    if (!this.dragging) return [];
    const lines: SnapLine[] = [];

    this.aroundSnapLines.forEach((line) => {
      lines.push(line);
    });

    return lines;
  }

  /**
   * 返回的是缩放前的,
   * @param node
   * @returns
   */
  calcBaseTranslate(
    node: TreeNode,
    {
      maxX,
      maxY,
    }: {
      maxX?: number;
      maxY?: number;
    }
  ) {
    const dragStartTranslate = this.dragStartTranslateStore[node.id] ?? {
      x: 0,
      y: 0,
    };

    let x = dragStartTranslate.x + this.deltaX;
    let y = dragStartTranslate.y + this.deltaY;
    if (x < 0) {
      x = 0;
    }
    if (y < 0) {
      y = 0;
    }
    if (maxX && x > maxX) {
      x = maxX;
    }
    if (maxY && y > maxY) {
      y = maxY;
    }

    return { x, y };
  }

  calcBaseResize(node: TreeNode) {
    const deltaX = this.deltaX;
    const deltaY = this.deltaY;
    const dragStartTranslate = this.dragStartTranslateStore[node.id] ?? {
      x: 0,
      y: 0,
    };
    const dragStartSize = this.dragStartSizeStore[node.id] ?? {
      width: 0,
      height: 0,
    };
    // 缩放的情况下
    const dragStartWidth =
      dragStartSize.width / this.operation.workspace.viewport.designScale;
    const dragStartHeight =
      dragStartSize.height / this.operation.workspace.viewport.designScale;
    switch (this.direction) {
      case "left-top":
        return new Rect(
          dragStartTranslate.x + deltaX,
          dragStartTranslate.y + deltaY,
          dragStartWidth - deltaX,
          dragStartHeight - deltaY
        );
      case "left-center":
        return new Rect(
          dragStartTranslate.x + deltaX,
          dragStartTranslate.y,
          dragStartWidth - deltaX,
          dragStartHeight
        );
      case "left-bottom":
        return new Rect(
          dragStartTranslate.x + deltaX,
          dragStartTranslate.y,
          dragStartWidth - deltaX,
          dragStartHeight + deltaY
        );
      case "center-bottom":
        return new Rect(
          dragStartTranslate.x,
          dragStartTranslate.y,
          dragStartWidth,
          dragStartHeight + deltaY
        );
      case "center-top":
        return new Rect(
          dragStartTranslate.x,
          dragStartTranslate.y + deltaY,
          dragStartWidth,
          dragStartHeight - deltaY
        );
      case "right-top":
        return new Rect(
          dragStartTranslate.x,
          dragStartTranslate.y + deltaY,
          dragStartWidth + deltaX,
          dragStartHeight - deltaY
        );
      case "right-bottom":
        return new Rect(
          dragStartTranslate.x,
          dragStartTranslate.y,
          dragStartWidth + deltaX,
          dragStartHeight + deltaY
        );
      case "right-center":
        return new Rect(
          dragStartTranslate.x,
          dragStartTranslate.y,
          dragStartWidth + deltaX,
          dragStartHeight
        );
    }
  }

  calcDragStartStore(nodes: TreeNode[] = []) {
    this.dragStartNodesRect = this.dragNodesRect;
    nodes.forEach((node) => {
      const element = node.getElement();
      const rect = node.getElementOffsetRect();
      this.dragStartTranslateStore[node.id] = calcElementTranslate(element);
      this.dragStartSizeStore[node.id] = {
        width: rect.width,
        height: rect.height,
      };
    });
  }

  calcRulerSnapLines(dragNodesRect: IRect): SnapLine[] {
    // 算出自身的边缘线(缩放后的尺寸)
    const edgeLines = calcEdgeLinesOfRect(dragNodesRect);

    return this.rulerSnapLines.map((line) => {
      line.distance = calcDistanceOfSnapLineToEdges(line, edgeLines);
      return line;
    });
  }

  calcAroundSnapLines(dragNodesRect: Rect): SnapLine[] {
    const results = [];
    const edgeLines = calcEdgeLinesOfRect(dragNodesRect);
    this.eachViewportNodes((refer, referRect) => {
      if (this.dragNodes.includes(refer)) return;
      const referLines = calcEdgeLinesOfRect(referRect);
      const add = (line: ILineSegment) => {
        // 贴边距离
        const [distance, edge] = calcClosestEdges(line, edgeLines);

        const combined = calcCombineSnapLineSegment(line, edge);
        // 另一边的间距
        const distance2 = calcRectMinDistance(dragNodesRect, referRect);

        if (
          distance < TransformHelper.threshold * this.viewport.designScale &&
          distance2 < TransformHelper.threshold2
        ) {
          if (this.snapping && distance !== 0) return;
          const snapLine = new SnapLine(this, {
            ...combined,
            distance,
          });
          const edge = snapLine.snapEdge(dragNodesRect);

          if (this.type === "translate") {
            results.push(snapLine);
          } else if (edge !== "hc" && edge !== "vc") {
            results.push(snapLine);
          }
        }
      };
      referLines.h.forEach(add);
      referLines.v.forEach(add);
    });

    return results;
  }

  calcViewportNodes() {
    this.tree.eachTree((node) => {
      const topRect = node.getValidElementRect();
      const offsetRect = node.getValidElementOffsetRect();

      if (this.dragNodes.includes(node)) return;

      if (this.viewport.isRectInViewport(topRect)) {
        this.viewportRectsStore[node.id] = offsetRect;
      }
    });
  }

  getNodeRect(node: TreeNode) {
    return this.viewportRectsStore[node.id];
  }

  eachViewportNodes(visitor: (node: TreeNode, rect: Rect) => void) {
    for (const id in this.viewportRectsStore) {
      visitor(this.tree.findById(id), this.viewportRectsStore[id]);
    }
  }

  calcAroundSpaceBlocks(dragNodesRect: IRect): AroundSpaceBlock {
    const closestSpaces = {};
    this.eachViewportNodes((refer, referRect) => {
      if (isEqualRect(dragNodesRect, referRect)) return;

      const origin = calcSpaceBlockOfRect(dragNodesRect, referRect);

      if (origin) {
        const spaceBlock = new SpaceBlock(this, {
          refer,
          ...origin,
        });
        if (!closestSpaces[origin.type]) {
          closestSpaces[origin.type] = spaceBlock;
        } else if (spaceBlock.distance < closestSpaces[origin.type].distance) {
          closestSpaces[origin.type] = spaceBlock;
        }
      }
    });
    return closestSpaces as any;
  }

  /**
   * effct后执行
   * @param node
   * @param handler
   *
   */
  translate(node: TreeNode, handler: (translate: IPoint) => void) {
    if (!this.dragging) return;

    const translate = this.calcBaseTranslate(node, {
      maxX:
        node.parent.getElement().offsetWidth - node.getElement().offsetWidth,
      maxY:
        node.parent.getElement().offsetHeight - node.getElement().offsetHeight,
    });

    this.snapped = false;
    this.snapping = false;
    for (const line of this.closestSnapLines) {
      line.translate(node, translate, this.viewport.designScale);
      this.snapping = true;
      this.snapped = true;
    }

    handler(translate);
    if (this.snapping) {
      this.dragMove();
      this.snapping = false;
    }
  }

  resize(node: TreeNode, handler: (resize: IRect) => void) {
    if (!this.dragging) return;
    const rect = this.calcBaseResize(node);

    this.snapped = false;
    this.snapping = false;
    for (const line of this.closestSnapLines) {
      line.resize(node, rect);
      this.snapping = true;
      this.snapped = true;
    }
    handler(rect);
    if (this.snapping) {
      this.dragMove();
      this.snapping = false;
    }
  }

  findRulerSnapLine(id: string) {
    return this.rulerSnapLines.find((item) => item.id === id);
  }

  addRulerSnapLine(line: SnapLine) {
    if (!isLineSegment(line)) return;
    if (!this.findRulerSnapLine(line.id)) {
      this.rulerSnapLines.push(new SnapLine(this, { ...line, type: "ruler" }));
    }
  }

  removeRulerSnapLine(id: string) {
    const matchedLineIndex = this.rulerSnapLines.findIndex(
      (item) => item.id === id
    );
    if (matchedLineIndex > -1) {
      this.rulerSnapLines.splice(matchedLineIndex, 1);
    }
  }

  dragStart(props: ITransformHelperDragStartProps) {
    const dragNodes = props?.dragNodes;
    const type = props?.type;
    const direction = props?.direction;
    if (type === "resize") {
      const nodes = TreeNode.filterResizable(dragNodes);
      if (nodes.length) {
        this.dragging = true;
        this.type = type;
        this.direction = direction;
        this.dragNodes = nodes;
        this.calcDragStartStore(nodes);
        this.cursor.setDragType(CursorDragType.Resize);
      }
    } else if (type === "translate") {
      const nodes = TreeNode.filterTranslatable(dragNodes);
      if (nodes.length) {
        this.dragging = true;
        this.type = type;
        this.direction = direction;
        this.dragNodes = nodes;
        this.calcDragStartStore(nodes);
        this.cursor.setDragType(CursorDragType.Translate);
      }
    }

    if (this.dragging) {
      this.calcViewportNodes();
    }
  }

  /**
   *    effct执行
   *
   */
  dragMove() {
    if (!this.dragging) return;
    this.draggingNodesRect = null;
    this.draggingNodesRect = this.dragNodesRect;

    this.rulerSnapLines = this.calcRulerSnapLines(this.dragNodesRect);
    this.aroundSnapLines = this.calcAroundSnapLines(this.dragNodesRect);
    this.aroundSpaceBlocks = this.calcAroundSpaceBlocks(this.dragNodesRect);
  }

  dragEnd() {
    this.dragging = false;
    this.viewportRectsStore = {};
    this.dragStartTranslateStore = {};
    this.aroundSnapLines = [];
    this.rulerSnapLines = [];
    this.draggingNodesRect = null;

    this.dragStartNodesRect = null;
    this.dragNodes = [];
    this.cursor.setDragType(CursorDragType.Move);
  }

  makeObservable() {
    define(this, {
      snapped: observable.ref,
      dragging: observable.ref,
      snapping: observable.ref,

      dragNodes: observable.ref,
      aroundSnapLines: observable.ref,
      aroundSpaceBlocks: observable.ref,
      rulerSnapLines: observable.shallow,
      closestSnapLines: observable.computed,
      thresholdSnapLines: observable.computed,
      thresholdSpaceBlocks: observable.computed,
      cursor: observable.computed,
      cursorPosition: observable.computed,
      cursorOffset: observable.computed,
      dragStartCursor: observable.computed,
      measurerSpaceBlocks: observable.computed,
      translate: action,
      dragStart: action,
      dragMove: action,
      dragEnd: action,
    });
  }

  static threshold = 6;
  static threshold2 = 40;
}
