import { action, define, observable } from "@formily/reactive";
import type { Engine } from "./Engine";
import type { TreeNode } from "./TreeNode";
import type { Workspace } from "./Workspace";
import type { IPoint } from "@/designable/shared";
import {
  Rect,
  calcBoundingRect,
  cancelIdle,
  globalThisPolyfill,
  isHTMLElement,
  isPointInRect,
  requestIdle,
} from "@/designable/shared";

export interface IViewportProps {
  engine: Engine;
  workspace: Workspace;
  viewportElement: HTMLElement;
  contentWindow: Window;
  nodeIdAttrName: string;
  moveSensitive?: boolean;
  moveInsertionType?: IViewportMoveInsertionType;
}

export interface IViewportData {
  scrollX?: number;
  scrollY?: number;
  width?: number;
  height?: number;
}

export type IViewportMoveInsertionType = "all" | "inline" | "block";

/**
 * 视口模型
 */
export class Viewport {
  workspace: Workspace;

  engine: Engine;

  contentWindow: Window;

  viewportElement: HTMLElement;

  dragStartSnapshot: IViewportData;

  scrollX = 0;

  scrollY = 0;

  width = 0;

  height = 0;

  mounted = false;

  attachRequest: number;

  nodeIdAttrName: string;

  moveSensitive: boolean;

  moveInsertionType: IViewportMoveInsertionType;

  nodeElementsStore: Record<string, HTMLElement[]> = {};

  designScale = 0.5;
  cols = 12;
  rows = 12;

  constructor(props: IViewportProps) {
    this.workspace = props.workspace;
    this.engine = props.engine;
    this.moveSensitive = props.moveSensitive ?? false;
    this.moveInsertionType = props.moveInsertionType ?? "all";
    this.viewportElement = props.viewportElement;
    this.contentWindow = props.contentWindow;
    this.nodeIdAttrName = props.nodeIdAttrName;
    this.digestViewport();
    this.makeObservable();
    this.attachEvents();
  }

  makeObservable() {
    define(this, {
      scrollX: observable.ref,
      scrollY: observable.ref,
      width: observable.ref,
      height: observable.ref,
      digestViewport: action,
      viewportElement: observable.ref,
      contentWindow: observable.ref,
      designScale: observable.ref,
      cols: observable.ref,
      rows: observable.ref,
    });
  }

  get isScrollLeft() {
    return this.scrollX === 0;
  }

  get isScrollTop() {
    return this.scrollY === 0;
  }

  get isScrollRight() {
    if (this.isIframe) {
      return (
        this.width + this.contentWindow.scrollX >=
        this.contentWindow?.document?.body?.scrollWidth
      );
    } else if (this.viewportElement) {
      return (
        this.viewportElement.offsetWidth + this.scrollX >=
        this.viewportElement.scrollWidth
      );
    }
  }

  get isScrollBottom() {
    if (this.isIframe) {
      if (!this.contentWindow?.document?.body) return false;
      return (
        this.height + this.contentWindow.scrollY >=
        this.contentWindow.document.body.scrollHeight
      );
    } else if (this.viewportElement) {
      if (!this.viewportElement) return false;
      return (
        this.viewportElement.offsetHeight + this.viewportElement.scrollTop >=
        this.viewportElement.scrollHeight
      );
    }
  }

  get innerRect() {
    const rect = this.rect;
    return new Rect(0, 0, rect?.width, rect?.height);
  }

  get offsetX() {
    const rect = this.rect;
    if (!rect) return 0;
    return rect.x;
  }

  get offsetY() {
    const rect = this.rect;
    if (!rect) return 0;
    return rect.y;
  }

  get scale() {
    if (!this.viewportElement) return 1;
    const clientRect = this.viewportElement.getBoundingClientRect();

    const offsetWidth = this.viewportElement.offsetWidth;
    if (!clientRect.width || !offsetWidth) return 1;
    return Math.round(clientRect.width / offsetWidth);
  }

  get isMaster() {
    return this.contentWindow === globalThisPolyfill;
  }

  get isIframe() {
    return !!this.contentWindow?.frameElement && !this.isMaster;
  }

  get viewportRoot() {
    return this.isIframe
      ? this.contentWindow?.document?.body
      : this.viewportElement;
  }

  get rect() {
    const viewportElement = this.viewportElement;
    if (viewportElement) {
      const r = viewportElement.getBoundingClientRect();

      return r;
    }
  }

  get viewportColWidth() {
    return this.rect.width ? this.rect.width / this.cols : 0;
  }

  get viewportRowHeight() {
    return this.rect.height ? this.rect.height / this.rows : 0;
  }

  findElementById(id: string): HTMLElement {
    if (!id) return;
    if (this.nodeElementsStore[id]) return this.nodeElementsStore[id][0];
    return this.viewportRoot?.querySelector(
      `*[${this.nodeIdAttrName}='${id}']`
    ) as HTMLElement;
  }

  matchViewport(
    target: HTMLElement | Element | Window | Document | EventTarget
  ) {
    if (this.isIframe) {
      return (
        target === this.viewportElement ||
        target === this.contentWindow ||
        target === this.contentWindow?.document
      );
    } else {
      return target === this.viewportElement;
    }
  }

  cacheElements() {
    this.nodeElementsStore = {};
    this.viewportRoot
      ?.querySelectorAll(`*[${this.nodeIdAttrName}]`)
      .forEach((element: HTMLElement) => {
        const id = element.getAttribute(this.nodeIdAttrName);
        this.nodeElementsStore[id] = this.nodeElementsStore[id] || [];
        this.nodeElementsStore[id].push(element);
      });
  }

  getCurrentData() {
    const data: IViewportData = {};
    if (this.isIframe) {
      data.scrollX = this.contentWindow?.scrollX || 0;
      data.scrollY = this.contentWindow?.scrollY || 0;
      data.width = this.contentWindow?.innerWidth || 0;
      data.height = this.contentWindow?.innerHeight || 0;
    } else if (this.viewportElement) {
      data.scrollX = this.viewportElement?.scrollLeft || 0;
      data.scrollY = this.viewportElement?.scrollTop || 0;
      data.width = this.viewportElement?.clientWidth || 0;
      data.height = this.viewportElement?.clientHeight || 0;
    }
    return data;
  }

  digestViewport() {
    const data = this.getCurrentData();

    Object.assign(this, data);
  }

  clearCache() {}

  attachEvents() {
    const engine = this.engine;
    cancelIdle(this.attachRequest);
    this.attachRequest = requestIdle(() => {
      if (!engine) return;
      if (this.isIframe) {
        this.workspace.attachEvents(this.contentWindow, this.contentWindow);
      } else if (isHTMLElement(this.viewportElement)) {
        this.workspace.attachEvents(this.viewportElement, this.contentWindow);
      }
    });
  }

  detachEvents() {
    if (this.isIframe) {
      this.workspace.detachEvents(this.contentWindow);
      this.workspace.detachEvents(this.viewportElement);
    } else if (this.viewportElement) {
      this.workspace.detachEvents(this.viewportElement);
    }
  }

  onMount(element: HTMLElement, contentWindow: Window) {
    this.mounted = true;
    this.viewportElement = element;
    this.contentWindow = contentWindow;
    this.attachEvents();
    this.digestViewport();
  }

  onUnmount() {
    this.mounted = false;
    this.detachEvents();
  }

  getValidNodeLayout(treeNode?: TreeNode) {}
  // root === element || root contains element
  containsElement(element: HTMLElement | Element | EventTarget) {
    const root: Element | Document = this.viewportElement;
    if (root === element) return true;
    return root?.contains(element as any);
  }

  isPointInViewport(point: IPoint, sensitive?: boolean) {
    if (!this.rect) return false;
    if (!this.containsElement(document.elementFromPoint(point.x, point.y))) {
      return false;
    }
    return isPointInRect(point, this.rect, sensitive);
  }

  findElementsById(id: string): HTMLElement[] {
    if (!id) return [];
    if (this.nodeElementsStore[id]) return this.nodeElementsStore[id];
    return Array.from(
      this.viewportRoot?.querySelectorAll(
        `*[${this.nodeIdAttrName}='${id}']`
      ) ?? []
    );
  }

  // 相对于页面
  getElementRect(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const offsetWidth = element.offsetWidth ? element.offsetWidth : rect.width;
    const offsetHeight = element.offsetHeight
      ? element.offsetHeight
      : rect.height;
    return new Rect(
      rect.x,
      rect.y,
      this.scale !== 1 ? offsetWidth : rect.width,
      this.scale !== 1 ? offsetHeight : rect.height
    );
  }

  // 相对于页面
  getElementRectById(id: string) {
    const elements = this.findElementsById(id);
    const rect = calcBoundingRect(
      elements.map((element) => this.getElementRect(element))
    );
    if (rect) {
      return new Rect(rect.x, rect.y, rect.width, rect.height);
    }
  }

  getChildrenRect(node: TreeNode): Rect {
    if (!node?.children?.length) return;
    return calcBoundingRect(
      node.children.reduce((buf, child) => {
        const rect = this.getValidNodeRect(child);
        if (rect) {
          return buf.concat(rect);
        }
        return buf;
      }, [])
    );
  }

  getValidNodeRect(node: TreeNode): Rect {
    if (!node) return;
    const rect = this.getElementRectById(node.id);
    if (node && node === node.root && node.isInOperation) {
      if (!rect) return this.rect;
      return calcBoundingRect([this.rect, rect]);
    }

    if (rect) {
      return rect;
    } else {
      return this.getChildrenRect(node);
    }
  }

  // 相对于视口
  getElementOffsetRectById(id: string) {
    const elements = this.findElementsById(id);
    if (!elements.length) return;
    const elementRect = calcBoundingRect(
      elements.map((element) => this.getElementRect(element))
    );
    if (elementRect) {
      if (this.isIframe) {
        return new Rect(
          elementRect.x + this.contentWindow.scrollX,
          elementRect.y + this.contentWindow.scrollY,
          elementRect.width,
          elementRect.height
        );
      } else {
        return new Rect(
          (elementRect.x - this.offsetX + this.viewportElement.scrollLeft) /
            this.scale,
          (elementRect.y - this.offsetY + this.viewportElement.scrollTop) /
            this.scale,
          elementRect.width,
          elementRect.height
        );
      }
    }
  }

  getChildrenOffsetRect(node: TreeNode): Rect {
    if (!node?.children?.length) return;

    return calcBoundingRect(
      node.children.reduce((buf, child) => {
        const rect = this.getValidNodeOffsetRect(child);
        if (rect) {
          return buf.concat(rect);
        }
        return buf;
      }, [])
    );
  }

  getValidNodeOffsetRect(node: TreeNode): Rect {
    if (!node) return;
    const rect = this.getElementOffsetRectById(node.id);

    if (node && node === node.root && node.isInOperation) {
      if (!rect) return this.innerRect;
      return calcBoundingRect([this.innerRect, rect]);
    }
    if (rect) {
      return rect;
    } else {
      return this.getChildrenOffsetRect(node);
    }
  }
}
