import type { IEngineContext } from '../types'
import type { Engine } from './Engine'
import type { IOperation } from './Operation'
import { Operation } from './Operation'
import { Viewport } from './Viewport'
import type { EventContainer, ICustomEvent } from '@/designable/shared'
import { uid } from '@/designable/shared'

export interface IViewportMatcher {
    contentWindow?: Window
    viewportElement?: HTMLElement
}

export interface IWorkspace {
    id?: string
    title?: string
    description?: string
    operation: IOperation
}

export interface IWorkspaceProps {
    id?: string
    title?: string
    description?: string
    contentWindow?: Window
    viewportElement?: HTMLElement
}

// 工作区模型
export class Workspace {
    id: string

    title: string

    description: string

    engine: Engine

    viewport: Viewport

    operation: Operation

    props: IWorkspaceProps

    constructor(engine: Engine, props: IWorkspaceProps) {
        this.engine = engine
        this.props = props
        this.id = props.id || uid()
        this.title = props.title
        this.description = props.description
        this.viewport = new Viewport({
            engine: this.engine,
            workspace: this,
            viewportElement: props.viewportElement,
            contentWindow: props.contentWindow,
            nodeIdAttrName: this.engine.props.nodeIdAttrName,
            moveSensitive: true,
            moveInsertionType: 'all',
        })

        this.operation = new Operation(this)
    }

    getEventContext(): IEngineContext {
        return {
            workbench: this.engine.workbench,

            workspace: this,
            engine: this.engine,
            viewport: this.viewport,
        }
    }

    attachEvents(container: EventContainer, contentWindow: Window) {
        this.engine.attachEvents(container, contentWindow, this.getEventContext())
    }

    detachEvents(container: EventContainer) {
        this.engine.detachEvents(container)
    }

    dispatch(event: ICustomEvent) {
        return this.engine.dispatch(event, this.getEventContext())
    }

    serialize(): IWorkspace {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            operation: this.operation.serialize(),
        }
    }

    from(workspace?: IWorkspace) {
        if (!workspace)
            return
        if (workspace.operation) {
            this.operation.from(workspace.operation)
        }
        if (workspace.id) {
            this.id = workspace.id
        }
        if (workspace.title) {
            this.title = workspace.title
        }
        if (workspace.description) {
            this.description = workspace.description
        }
    }
}
