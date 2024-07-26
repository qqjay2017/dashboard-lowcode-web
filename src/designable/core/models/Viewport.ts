import type { Engine } from './Engine'
import type { Workspace } from './Workspace'

export interface IViewportProps {
  engine: Engine
  workspace: Workspace
  viewportElement: HTMLElement
  contentWindow: Window
  nodeIdAttrName: string
  moveSensitive?: boolean
  moveInsertionType?: IViewportMoveInsertionType
}

export interface IViewportData {
  scrollX?: number
  scrollY?: number
  width?: number
  height?: number
}

export type IViewportMoveInsertionType = 'all' | 'inline' | 'block'

/**
 * 视口模型
 */
export class Viewport {
  workspace: Workspace

  engine: Engine

  contentWindow: Window

  viewportElement: HTMLElement

  constructor(props: IViewportProps) { }
  detachEvents() {

  }

  getValidNodeLayout(p1?: any) { }
  cacheElements() { }
  clearCache() { }
}
