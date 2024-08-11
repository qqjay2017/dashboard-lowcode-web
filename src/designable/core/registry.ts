import { observable } from '@formily/reactive'
import type {
  IBehavior,
  IBehaviorLike,
  IDesignerBehaviorStore,
  IDesignerBehaviors,
} from './types'

import { isBehaviorHost, isBehaviorList } from './externals'
import type { TreeNode } from './models'
import { each } from '@/designable/shared'

function reSortBehaviors(target: IBehavior[], sources: IDesignerBehaviors) {
  const findTargetBehavior = (behavior: IBehavior) => target.includes(behavior)
  const findSourceBehavior = (name: string) => {
    for (const key in sources) {
      const { Behavior } = sources[key]
      for (let i = 0; i < Behavior.length; i++) {
        if (Behavior[i].name === name)
          return Behavior[i]
      }
    }
  }
  each(sources, (item) => {
    if (!item)
      return
    if (!isBehaviorHost(item))
      return
    const { Behavior } = item
    each(Behavior, (behavior) => {
      if (findTargetBehavior(behavior))
        return
      const name = behavior.name
      each(behavior.extends, (dep) => {
        const behavior = findSourceBehavior(dep)
        if (!behavior)
          throw new Error(`No ${dep} behavior that ${name} depends on`)
        if (!findTargetBehavior(behavior)) {
          target.unshift(behavior)
        }
      })
      target.push(behavior)
    })
  })
}

const DESIGNER_BEHAVIORS_STORE: IDesignerBehaviorStore = observable.ref([])

const DESIGNER_GlobalRegistry = {

  setDesignerBehaviors: (behaviors: IBehaviorLike[]) => {
    DESIGNER_BEHAVIORS_STORE.value = behaviors.reduce<IBehavior[]>(
      (buf, behavior) => {
        if (isBehaviorHost(behavior)) {
          return buf.concat(behavior.Behavior)
        }
        else if (isBehaviorList(behavior)) {
          return buf.concat(behavior)
        }
        return buf
      },
      [],
    )
  },

  getDesignerBehaviors: (node: TreeNode) => {
    return DESIGNER_BEHAVIORS_STORE.value.filter(pattern =>
      pattern.selector(node),
    )
  },

  getDesignerMessage: (token: string) => {
    return token
  },

  registerDesignerBehaviors: (...packages: IDesignerBehaviors[]) => {
    const results: IBehavior[] = []
    packages.forEach((sources) => {
      reSortBehaviors(results, sources)
    })
    if (results.length) {
      DESIGNER_BEHAVIORS_STORE.value = results
    }
  },
}

export type IDesignerRegistry = typeof DESIGNER_GlobalRegistry

export const GlobalRegistry: IDesignerRegistry = DESIGNER_GlobalRegistry
