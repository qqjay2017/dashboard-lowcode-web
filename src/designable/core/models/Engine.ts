import type { IEngineProps } from "../types";
import { Event, globalThisPolyfill } from "../../shared";
import { Cursor } from "./Cursor";
import { Workbench } from "./Workbench";
import type { ITreeNode } from "./TreeNode";
import { TreeNode } from "./TreeNode";
import { uid } from "@/designable/shared";

export class Engine extends Event {
  id: string;

  props: IEngineProps<Engine>;

  cursor: Cursor;
  workbench: Workbench;
  //   keyboard: Keyboard;

  //   screen: Screen;

  constructor(props: IEngineProps<Engine>) {
    super(props);
    this.props = {
      ...Engine.defaultProps,
      ...props,
    };

    this.init();
    this.id = uid();
  }

  init() {
    this.workbench = new Workbench(this);
    this.cursor = new Cursor(this);
  }

  mount() {
    this.attachEvents(globalThisPolyfill);
  }

  unmount() {
    this.detachEvents();
  }

  setCurrentTree(tree?: ITreeNode) {
    if (this.workbench.currentWorkspace) {
      this.workbench.currentWorkspace.operation.tree.from(tree);
    }
  }

  static defaultProps: IEngineProps<Engine> = {
    // shortcuts: [],
    effects: [],
    drivers: [],
    rootComponentName: "Root",
    sourceIdAttrName: "data-designer-source-id",
    nodeIdAttrName: "data-designer-node-id",
    contentEditableAttrName: "data-content-editable",
    contentEditableNodeIdAttrName: "data-content-editable-node-id",
    clickStopPropagationAttrName: "data-click-stop-propagation",
    nodeSelectionIdAttrName: "data-designer-node-helpers-id",
    nodeDragHandlerAttrName: "data-designer-node-drag-handler",
    screenResizeHandlerAttrName: "data-designer-screen-resize-handler",
    nodeResizeHandlerAttrName: "data-designer-node-resize-handler",

    // nodeTranslateAttrName: "data-designer-node-translate-handler",
    // defaultScreenType: ScreenType.PC,
  };

  findNodeById(id) {
    return TreeNode.findById(id);
  }

  findMovingNodes() {
    return this.workbench.currentWorkspace.operation.moveHelper.dragNodes || [];
  }

  getCurrentTree() {
    return this.workbench?.currentWorkspace?.operation?.tree;
  }

  getAllSelectedNodes() {
    let results: TreeNode[] = [];
    for (let i = 0; i < this.workbench.workspaces.length; i++) {
      const workspace = this.workbench.workspaces[i];
      results = results.concat(workspace.operation.selection.selectedNodes);
    }
    return results;
  }

  createNode(node: ITreeNode, parent?: TreeNode) {
    return new TreeNode(node, parent);
  }
}
