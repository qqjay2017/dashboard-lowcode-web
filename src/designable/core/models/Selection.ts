import type { Operation } from './Operation'
import type { TreeNode } from './TreeNode'

export interface ISelection {
  selected?: string[]
  operation?: Operation
}
export class Selection {
  operation: Operation
  selected: string[] = []
  indexes: Record<string, boolean> = {}
  constructor(props?: ISelection) { }
  get selectedNodes() {
    return []
  }

  get first() {
    if (this.selected && this.selected.length)
      return this.selected[0]
  }

  get length() {
    return this.selected.length
  }

  select(p1?: any) { }
  has(...ids: string[] | TreeNode[]) {
    return false
    // return this.mapIds(ids).some((id) => {
    //   if (isStr(id)) {
    //     return this.indexes[id]
    //   }
    //   else {
    //     if (!id?.id)
    //       return false
    //     return this.has(id?.id)
    //   }
    // })
  }

  remove(p1?: any) { }
}
