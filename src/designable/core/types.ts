import type { ISchema } from "@formily/json-schema";
import type { IEventProps } from "../shared";
import type { Engine, ITreeNode, TreeNode } from "./models";
import type { Workspace } from "./models/Workspace";
import type { Workbench } from "./models/Workbench";
import type { Viewport } from "./models/Viewport";

export interface IDesignerProps {
  package?: string; // npm包名
  registry?: string; // web npm注册平台地址
  version?: string; // semver版本号
  path?: string; // 组件模块路径
  title?: string; // 标题
  description?: string; // 描述
  icon?: string; // icon
  droppable?: boolean; // 是否可作为拖拽容器，默认为true
  draggable?: boolean; // 是否可拖拽，默认为true
  deletable?: boolean; // 是否可删除，默认为true
  cloneable?: boolean; // 是否可拷贝，默认为true
  // resizable?: IResizable;
  // translatable?: ITranslate; // 自由布局
  inlineChildrenLayout?: boolean; // 子节点内联，用于指定复杂布局容器，强制内联
  selfRenderChildren?: boolean; // 是否自己渲染子节点
  propsSchema?: any; // Formily JSON Schema
  defaultProps?: any; // 默认属性
  getDragNodes?: (node: TreeNode) => TreeNode | TreeNode[]; // 拦截转换Drag节点
  getDropNodes?: (node: TreeNode, parent: TreeNode) => TreeNode | TreeNode[]; // 拦截转换Drop节点
  getComponentProps?: (node: TreeNode) => any; // 拦截属性
  allowAppend?: (target: TreeNode, sources?: TreeNode[]) => boolean;
  allowSiblings?: (target: TreeNode, sources?: TreeNode[]) => boolean;
  allowDrop?: (target: TreeNode) => boolean;
  [key: string]: any;
}
export type IDesignerControllerProps =
  | IDesignerProps
  | ((node: TreeNode) => IDesignerProps);

export interface IBehavior {
  name: string;
  extends?: string[];
  selector: (node: TreeNode) => boolean;
  designerProps?: IDesignerControllerProps;
}
export interface IResource {
  title?: string;
  description?: string;
  icon?: any;
  thumb?: string;
  span?: number;
  node?: TreeNode;
}

export type IEngineProps<T = Event> = IEventProps<T> & {
  sourceIdAttrName?: string; // 拖拽源Id的dom属性名
  nodeIdAttrName?: string; // 节点Id的dom属性名
  contentEditableAttrName?: string; // 原地编辑属性名
  contentEditableNodeIdAttrName?: string; // 原地编辑指定Node Id属性名
  clickStopPropagationAttrName?: string; // 点击阻止冒泡属性

  nodeSelectionIdAttrName?: string; // 节点工具栏属性名
  nodeDragHandlerAttrName?: string; // 节点拖拽手柄属性名
  screenResizeHandlerAttrName?: string;
  nodeResizeHandlerAttrName?: string; // 节点尺寸拖拽手柄属性名
  // nodeTranslateAttrName?: string; // 节点自由布局的属性名
  defaultComponentTree?: ITreeNode; // 默认组件树
  //   defaultScreenType?: ScreenType;
  rootComponentName?: string;
};

export interface IEngineContext {
  engine: Engine;
  workspace: Workspace;
  workbench: Workbench;

  viewport: Viewport;
}

export type WorkbenchTypes =
  | "DESIGNABLE"
  | "PREVIEW"
  | "JSONTREE"
  | "MARKUP"
  | (string & {});

export interface IResourceCreator {
  title?: string;
  description?: string;
  icon?: any;
  thumb?: string;
  span?: number;
  elements?: ITreeNode[];
}
export interface IResourceHost {
  Resource?: IResource[];
}

export type IResourceLike = IResource[] | IResourceHost;

export interface IBehaviorCreator {
  name: string;
  extends?: string[];
  selector: string | ((node: TreeNode) => boolean);
  designerProps?: IDesignerControllerProps;
}

export interface IBehaviorHost {
  Behavior?: IBehavior[];
}

export type IBehaviorLike = IBehavior[] | IBehaviorHost;
export interface IDesignerBehaviors {
  [key: string]: IBehaviorHost;
}
export interface IDesignerStore<P> {
  value: P;
}

export type IDesignerBehaviorStore = IDesignerStore<IBehavior[]>;
export type IDesignerLanguageStore = IDesignerStore<string>;
