import { action, define, observable, toJS } from "@formily/reactive";
import { get, set } from "lodash-es";
import {
  AppendNodeEvent,
  CloneNodeEvent,
  FromNodeEvent,
  InsertAfterEvent,
  RemoveNodeEvent,
  UpdateChildrenEvent,
  UpdateNodePropsEvent,
} from "../events";
import type { IDesignerControllerProps, IDesignerProps } from "../types";
import { GlobalRegistry } from "../registry";
import type { Operation } from "./Operation";
import { each, isFn, uid } from "@/designable/shared";

const CommonDesignerPropsMap = new Map<string, IDesignerControllerProps>();

export interface ITreeNode {
  componentName?: string;
  sourceName?: string;
  operation?: Operation;
  hidden?: boolean;
  isSourceNode?: boolean;
  id?: string;
  props?: Record<string | number | symbol, any>;
  children?: ITreeNode[];
  componentDisplayName?: string;
}

function removeNode(node: TreeNode) {
  if (node.parent) {
    node.parent.children = node.parent.children.filter(
      (child) => child !== node
    );
  }
}

function resetNodesParent(nodes: TreeNode[], parent: TreeNode) {
  const resetDepth = (node: TreeNode) => {
    node.depth = node.parent ? node.parent.depth + 1 : 0;
    node.children.forEach(resetDepth);
  };

  const shallowReset = (node: TreeNode) => {
    node.parent = parent;
    node.root = parent.root;
    resetDepth(node);
  };

  const deepReset = (node: TreeNode) => {
    shallowReset(node);
    resetNodesParent(node.children, node);
  };

  return nodes.map((node) => {
    if (node === parent) return node;
    if (!parent.isSourceNode) {
      if (node.isSourceNode) {
        node = node.clone(parent);
        resetDepth(node);
      } else if (!node.isRoot && node.isInOperation) {
        // node.operation?.selection.remove(node)
        removeNode(node);
        shallowReset(node);
      } else {
        deepReset(node);
      }
    } else {
      deepReset(node);
    }
    if (!TreeNodes.has(node.id)) {
      TreeNodes.set(node.id, node);
      CommonDesignerPropsMap.set(node.componentName, node.designerProps);
    }
    return node;
  });
}

function resetParent(node: TreeNode, parent: TreeNode) {
  return resetNodesParent([node], parent)[0];
}

function resolveDesignerProps(node: TreeNode, props: IDesignerControllerProps) {
  if (isFn(props)) return props(node);
  return props;
}

const TreeNodes = new Map<string, TreeNode>();

export class TreeNode {
  parent: TreeNode;

  root: TreeNode;

  rootOperation: Operation;

  id: string;

  depth = 0;

  hidden = false;

  componentName = "NO_NAME_COMPONENT";

  sourceName = "";

  props: ITreeNode["props"] = {};

  children: TreeNode[] = [];

  isSelfSourceNode: boolean;

  constructor(node?: ITreeNode, parent?: TreeNode) {
    if (node instanceof TreeNode) {
      return node;
    }
    this.id = node.id || uid();
    if (parent) {
      this.parent = parent;
      this.depth = parent.depth + 1;
      this.root = parent.root;
      TreeNodes.set(this.id, this);
    } else {
      this.root = this;
      this.rootOperation = node.operation;
      this.isSelfSourceNode = node.isSourceNode || false;
      TreeNodes.set(this.id, this);
    }
    if (node) {
      this.from(node);
    }
    this.makeObservable();
  }

  makeObservable() {
    define(this, {
      componentName: observable.ref,
      props: observable,
      hidden: observable.ref,
      children: observable.shallow,
      designerProps: observable.computed,

      // append: action,

      remove: action,
      setProps: action,
      setChildren: action,
      setComponentName: action,
    });
  }

  get designerProps(): IDesignerProps {
    const behaviors = GlobalRegistry.getDesignerBehaviors(this);
    const designerProps: IDesignerProps = behaviors.reduce((buf, pattern) => {
      if (!pattern.designerProps) return buf;
      Object.assign(buf, resolveDesignerProps(this, pattern.designerProps));
      return buf;
    }, {});
    return designerProps;
  }

  get previous() {
    if (this.parent === this || !this.parent) return;
    return this.parent.children[this.index - 1];
  }

  get next() {
    if (this.parent === this || !this.parent) return;
    return this.parent.children[this.index + 1];
  }

  get siblings() {
    if (this.parent) {
      return this.parent.children.filter((node) => node !== this);
    }
    return [];
  }

  get index() {
    if (this.parent === this || !this.parent) return 0;
    return this.parent.children.indexOf(this);
  }

  get descendants(): TreeNode[] {
    return this.children.reduce((buf, node) => {
      return buf.concat(node).concat(node.descendants);
    }, []);
  }

  get isRoot() {
    return this === this.root;
  }

  get isInOperation() {
    return !!this.operation;
  }

  get lastChild() {
    return this.children[this.children.length - 1];
  }

  get firstChild() {
    return this.children[0];
  }

  get isSourceNode() {
    return this.root.isSelfSourceNode;
  }

  get operation() {
    return this.root?.rootOperation;
  }

  get viewport() {
    return this.operation?.workspace?.viewport;
  }

  get moveLayout() {
    return this.viewport?.getValidNodeLayout(this);
  }

  getElement(area: "viewport" | "outline" = "viewport") {
    return this[area]?.findElementById(this.id);
  }

  getValidElement(area: "viewport" | "outline" = "viewport") {
    return this[area]?.getValidNodeElement(this);
  }

  getElementRect(area: "viewport" | "outline" = "viewport") {
    return this[area]?.getElementRect(this.getElement(area));
  }

  getValidElementRect(area: "viewport" | "outline" = "viewport") {
    return this[area]?.getValidNodeRect(this);
  }

  getElementOffsetRect(area: "viewport" | "outline" = "viewport") {
    return this[area]?.getElementOffsetRect(this.getElement(area));
  }

  getValidElementOffsetRect(area: "viewport" | "outline" = "viewport") {
    return this[area]?.getValidNodeOffsetRect(this);
  }

  remove() {
    return this.triggerMutation(
      new RemoveNodeEvent({
        target: this,
        source: null,
      }),
      () => {
        removeNode(this);
        TreeNodes.delete(this.id);
      }
    );
  }

  setProps(props?: any) {
    return this.triggerMutation(
      new UpdateNodePropsEvent({
        target: this,
        source: null,
      }),
      () => {
        Object.assign(this.props, props);
      }
    );
  }

  setComponentName(componentName: string) {
    this.componentName = componentName;
  }

  setChildren(...nodes: TreeNode[]) {
    const originSourceParents = nodes.map((node) => node.parent);
    const newNodes = this.resetNodesParent(nodes, this);
    return this.triggerMutation(
      new UpdateChildrenEvent({
        originSourceParents,
        target: this,
        source: newNodes,
      }),
      () => {
        this.children = newNodes;
        return newNodes;
      },
      []
    );
  }

  allowDrag() {
    if (this === this.root && !this.isSourceNode) return false;
    return true;
    //  return this.designerProps.draggable ?? true
  }

  triggerMutation<T>(event: any, callback?: () => T, defaults?: T): T {
    if (this.operation) {
      const result = this.operation.dispatch(event, callback) || defaults;
      // this.takeSnapshot(event?.type)
      return result;
    } else if (isFn(callback)) {
      return callback();
    }
  }

  clone(parent?: TreeNode) {
    const newNode = new TreeNode(
      {
        id: uid(),
        componentName: this.componentName,
        sourceName: this.sourceName,
        props: toJS(this.props),
        children: [],
      },
      parent || this.parent
    );
    newNode.children = resetNodesParent(
      this.children.map((child) => {
        return child.clone(newNode);
      }),
      newNode
    );
    return this.triggerMutation(
      new CloneNodeEvent({
        target: this,
        source: newNode,
      }),
      () => newNode
    );
  }

  from(node?: ITreeNode) {
    if (!node) return;
    return this.triggerMutation(
      new FromNodeEvent({
        target: this,
        source: node,
      }),
      () => {
        if (node.id && node.id !== this.id) {
          TreeNodes.delete(this.id);
          TreeNodes.set(node.id, this);
          this.id = node.id;
        }
        if (node.componentName) {
          this.componentName = node.componentName;
        }
        this.props = node.props ?? {};
        if (node.hidden) {
          this.hidden = node.hidden;
        }
        if (node.children) {
          this.children =
            node.children?.map?.((node) => {
              return new TreeNode(node, this);
            }) || [];
        }
      }
    );
  }

  serialize(): ITreeNode {
    return {
      id: this.id,
      componentName: this.componentName,
      sourceName: this.sourceName,
      props: toJS(this.props),
      hidden: this.hidden,
      children: this.children.map((treeNode) => {
        return treeNode.serialize();
      }),
    };
  }

  findById(id: string) {
    if (!id) return;
    if (this.id === id) return this;
    if (this.children?.length > 0) {
      return TreeNodes.get(id);
    }
  }

  getParentByDepth(depth = 0) {
    const parent = this.parent;
    if (parent?.depth === depth) {
      return parent;
    } else {
      return parent?.getParentByDepth(depth);
    }
  }

  contains(...nodes: TreeNode[]) {
    return nodes.every((node) => {
      if (
        node === this ||
        node?.parent === this ||
        node?.getParentByDepth(this.depth) === this
      ) {
        return true;
      }
      return false;
    });
  }

  resetNodesParent(nodes: TreeNode[], parent: TreeNode) {
    return resetNodesParent(
      nodes.filter((node) => node !== this),
      parent
    );
  }

  allowDrop(parent: TreeNode) {
    if (!isFn(this.designerProps.allowDrop)) return true;
    return this.designerProps.allowDrop(parent);
  }

  allowAppend(nodes: TreeNode[]) {
    if (!this.designerProps?.droppable) return false;
    if (this.designerProps?.allowAppend?.(this, nodes) === false) return false;
    if (nodes.some((node) => !node.allowDrop(this))) return false;
    if (this.root === this) return true;
    return true;
  }

  allowClone() {
    if (this === this.root) return false;
    return this.designerProps.cloneable ?? true;
  }

  allowResize(): false | Array<"x" | "y"> {
    if (this === this.root && !this.isSourceNode) return false;
    const { resizable } = this.designerProps;
    if (!resizable) {
      return false;
    }

    return ["x", "y"];
  }

  append(...nodes: TreeNode[]) {
    if (nodes.some((node) => node.contains(this))) return [];
    const originSourceParents = nodes.map((node) => node.parent);
    const newNodes = this.resetNodesParent(nodes, this);
    if (!newNodes.length) return [];
    return this.triggerMutation(
      new AppendNodeEvent({
        originSourceParents,
        target: this,
        source: newNodes,
      }),
      () => {
        this.children = this.children.concat(newNodes);
        return newNodes;
      },
      []
    );
  }

  distanceTo(node: TreeNode) {
    if (this.root !== node.root) {
      return Infinity;
    }
    if (this.parent !== node.parent) {
      return Infinity;
    }
    return Math.abs(this.index - node.index);
  }

  crossSiblings(node: TreeNode): TreeNode[] {
    if (this.parent !== node.parent) return [];
    const minIndex = Math.min(this.index, node.index);
    const maxIndex = Math.max(this.index, node.index);
    const results = [];
    for (let i = minIndex + 1; i < maxIndex; i++) {
      results.push(this.parent.children[i]);
    }
    return results;
  }

  isMyAncestor(node: TreeNode) {
    if (node === this || this.parent === node) return false;
    return node.contains(this);
  }

  isMyParent(node: TreeNode) {
    return this.parent === node;
  }

  isMyParents(node: TreeNode) {
    if (node === this) return false;
    return this.isMyParent(node) || this.isMyAncestor(node);
  }

  isMyChild(node: TreeNode) {
    return node.isMyParent(this);
  }

  isMyChildren(node: TreeNode) {
    return node.isMyParents(this);
  }

  takeSnapshot(type?: string) {
    // this.operation?.snapshot(type);
  }

  getParents(node?: TreeNode): TreeNode[] {
    const _node = node || this;
    return _node?.parent
      ? [_node.parent].concat(this.getParents(_node.parent))
      : [];
  }

  allowTranslate(): boolean {
    if (this === this.root && !this.isSourceNode) return false;
    const { translatable } = this.designerProps;
    if (!translatable) {
      return false;
    }
    return true;
  }

  allowDelete() {
    if (this === this.root) return false;
    return this.designerProps.deletable ?? true;
  }

  eachTree(callback?: (node: TreeNode) => void | boolean) {
    if (isFn(callback)) {
      callback(this.root);
      this.root?.eachChildren(callback);
    }
  }

  eachChildren(callback?: (node: TreeNode) => void | boolean) {
    if (isFn(callback)) {
      for (let i = 0; i < this.children.length; i++) {
        const node = this.children[i];
        if (callback(node) === false) return;
        node.eachChildren(callback);
      }
    }
  }

  insertAfter(...nodes: TreeNode[]) {
    const parent = this.parent;
    if (nodes.some((node) => node.contains(this))) return [];
    if (parent?.children?.length) {
      const originSourceParents = nodes.map((node) => node.parent);
      const newNodes = this.resetNodesParent(nodes, parent);
      if (!newNodes.length) return [];

      return this.triggerMutation(
        new InsertAfterEvent({
          originSourceParents,
          target: this,
          source: newNodes,
        }),
        () => {
          parent.children = parent.children.reduce((buf, node) => {
            if (node === this) {
              return buf.concat([node]).concat(newNodes);
            } else {
              return buf.concat([node]);
            }
          }, []);
          return newNodes;
        },
        []
      );
    }
    return [];
  }

  static findById(id) {
    return TreeNodes.get(id);
  }

  static filterDraggable(nodes: TreeNode[] = []) {
    return nodes.reduce((buf, node) => {
      if (!node.allowDrag()) {
        return buf;
      }

      if (node.componentName === "$$ResourceNode$$")
        return buf.concat(node.children);
      return buf.concat([node]);
    }, []);
  }

  static filterDroppable(nodes: TreeNode[] = [], parent: TreeNode) {
    return nodes.reduce((buf, node) => {
      if (!node.allowDrop(parent)) return buf;
      if (isFn(node.designerProps?.getDropNodes)) {
        const cloned = node.isSourceNode ? node.clone(node.parent) : node;
        const transformed = node.designerProps.getDropNodes(cloned, parent);
        return transformed ? buf.concat(transformed) : buf;
      }
      if (node.componentName === "$$ResourceNode$$")
        return buf.concat(node.children);
      return buf.concat([node]);
    }, []);
  }

  static remove(nodes: TreeNode[] = []) {
    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];
      if (node.allowDelete()) {
        const previous = node.previous;
        const next = node.next;
        node.remove();
        node.operation?.selection.select(previous || next || node.parent);
        node.operation?.hover.clear();
      }
    }
  }

  static sort(nodes: TreeNode[] = []) {
    return nodes.sort((before, after) => {
      if (before.depth !== after.depth) return 0;
      return before.index - after.index >= 0 ? 1 : -1;
    });
  }

  static clone(nodes: TreeNode[] = []) {
    const groups: { [parentId: string]: TreeNode[] } = {};
    const lastGroupNode: { [parentId: string]: TreeNode } = {};
    const filterNestedNode = TreeNode.sort(nodes).filter((node) => {
      return !nodes.some((parent) => {
        return node.isMyParents(parent);
      });
    });
    each(filterNestedNode, (node) => {
      if (node === node.root) return;
      if (!node.allowClone()) return;
      if (!node?.operation) return;
      groups[node?.parent?.id] = groups[node?.parent?.id] || [];
      groups[node?.parent?.id].push(node);
      if (lastGroupNode[node?.parent?.id]) {
        if (node.index > lastGroupNode[node?.parent?.id].index) {
          lastGroupNode[node?.parent?.id] = node;
        }
      } else {
        lastGroupNode[node?.parent?.id] = node;
      }
    });
    const parents = new Map<TreeNode, TreeNode[]>();
    each(groups, (nodes, parentId) => {
      const lastNode = lastGroupNode[parentId];
      let insertPoint = lastNode;
      each(nodes, (node) => {
        const cloned = node.clone();

        if (!cloned) return;
        const decorator = get(cloned, "props.x-decorator-props", {}) || {};
        set(
          cloned,
          "props.x-decorator-props.zIndex",
          (decorator.zIndex || 1) + 1
        );
        set(cloned, "props.x-decorator-props.x", (decorator.x || 0) + 0.15);
        set(cloned, "props.x-decorator-props.y", (decorator.y || 0) + 0.15);

        if (
          node.operation?.selection.has(node) &&
          insertPoint.parent.allowAppend([cloned])
        ) {
          // debugger;
          insertPoint.insertAfter(cloned);
          insertPoint = insertPoint.next;
        } else if (node.operation.selection.length === 1) {
          const targetNode = node.operation?.tree.findById(
            node.operation.selection.first
          );
          let cloneNodes = parents.get(targetNode);
          if (!cloneNodes) {
            cloneNodes = [];
            parents.set(targetNode, cloneNodes);
          }
          if (targetNode && targetNode.allowAppend([cloned])) {
            cloneNodes.push(cloned);
          }
        }
      });
    });
    parents.forEach((nodes, target) => {
      if (!nodes.length) return;
      target.append(...nodes);
    });
  }

  static filterResizable(nodes: TreeNode[] = []) {
    return nodes.filter((node) => node.allowResize());
  }

  static filterTranslatable(nodes: TreeNode[] = []) {
    return nodes.filter((node) => node.allowTranslate());
  }
}
