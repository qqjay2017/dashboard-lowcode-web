import { action, define, observable } from '@formily/reactive'
import type { WorkbenchTypes } from '../types'
import { AddWorkspaceEvent } from '../events'
import type { Engine } from './Engine'
import type { IWorkspaceProps } from './Workspace'
import { Workspace } from './Workspace'

export class Workbench {
    workspaces: Workspace[] = []
    currentWorkspace: Workspace = null
    activeWorkspace: Workspace = null
    type: WorkbenchTypes = 'DESIGNABLE'
    engine: Engine
    constructor(engine: Engine) {
        this.engine = engine
        this.workspaces = []
        this.currentWorkspace = null
        this.activeWorkspace = null
        this.makeObservable()
    }

    makeObservable() {
        define(this, {
            currentWorkspace: observable.ref,
            activeWorkspace: observable.ref,
            type: observable.ref,
            setActiveWorkspace: action,
            setWorkbenchType: action,
        })
    }

    setActiveWorkspace(workspace: Workspace) {
        this.activeWorkspace = workspace
        return workspace
    }

    setWorkbenchType(type: WorkbenchTypes) {
        this.type = type
    }

    addWorkspace(props: IWorkspaceProps) {
        const finded = this.findWorkspaceById(props.id)
        if (!finded) {
            /**
             * 初始化实例
             */
            this.currentWorkspace = new Workspace(this.engine, props)
            this.workspaces.push(this.currentWorkspace)
            this.engine.dispatch(new AddWorkspaceEvent(this.currentWorkspace))
            return this.currentWorkspace
        }
        return finded
    }

    ensureWorkspace(props: IWorkspaceProps = {}) {
        const workspace = this.findWorkspaceById(props.id)
        if (workspace)
            return workspace
        this.addWorkspace(props)
        return this.currentWorkspace
    }

    findWorkspaceById(id: string) {
        return this.workspaces.find(item => item.id === id)
    }
}
