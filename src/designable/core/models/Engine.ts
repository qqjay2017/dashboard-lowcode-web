import type { IEngineProps } from '../types'
import { Event, globalThisPolyfill, uid } from '../../shared'
import { Screen, ScreenType } from './Screen'
import { Workbench } from './Workbench'
import type { ITreeNode } from './TreeNode'
import { TreeNode } from './TreeNode'
import { Cursor } from './Cursor'

export class Engine extends Event {
  id: string

  props: IEngineProps<Engine>
  cursor: Cursor
  workbench: Workbench
  screen: Screen
  constructor(props: IEngineProps<Engine>) {
    super(props)
    this.props = {
      ...Engine.defaultProps,
      ...props,
    }
    this.init()
    this.id = uid()
  }

  init() {
    this.workbench = new Workbench(this)
    this.screen = new Screen(this)
    this.cursor = new Cursor(this)
    // this.keyboard = new Keyboard(this)
  }

  setCurrentTree(tree?: ITreeNode) {
    if (this.workbench.currentWorkspace) {
      this.workbench.currentWorkspace.operation.tree.from(tree)
    }
  }

  getCurrentTree() {
    return this.workbench?.currentWorkspace?.operation?.tree
  }

  findNodeById(id: string) {
    return TreeNode.findById(id)
  }

  createNode(node: ITreeNode, parent?: TreeNode) {
    return new TreeNode(node, parent)
  }

  mount() {
    this.attachEvents(globalThisPolyfill)
  }

  unmount() {
    this.detachEvents()
  }

  static defaultProps: IEngineProps<Engine> = {
    shortcuts: [],
    effects: [],
    drivers: [],
    rootComponentName: 'Root',
    sourceIdAttrName: 'data-designer-source-id',
    nodeIdAttrName: 'data-designer-node-id',
    contentEditableAttrName: 'data-content-editable',
    contentEditableNodeIdAttrName: 'data-content-editable-node-id',
    clickStopPropagationAttrName: 'data-click-stop-propagation',
    nodeSelectionIdAttrName: 'data-designer-node-helpers-id',
    nodeDragHandlerAttrName: 'data-designer-node-drag-handler',
    screenResizeHandlerAttrName: 'data-designer-screen-resize-handler',
    nodeResizeHandlerAttrName: 'data-designer-node-resize-handler',
    outlineNodeIdAttrName: 'data-designer-outline-node-id',
    nodeTranslateAttrName: 'data-designer-node-translate-handler',
    defaultScreenType: ScreenType.PC,
  }
}
