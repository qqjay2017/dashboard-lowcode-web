import { useContext, useEffect } from 'react'
import { Engine } from '@designable/core'
import { DesignerEngineContext } from '../context'

import { isFn, globalThisPolyfill } from '@designable/shared'



type Engine2 = Engine & {
  // findMovingNodes:()=>any;
}

export interface IEffects {
  (engine: Engine2): void
}


export const useDesigner = (effects?: IEffects): Engine2 => {
  const designer: Engine2 =
    globalThisPolyfill['__DESIGNABLE_ENGINE__'] ||
    useContext(DesignerEngineContext)
  useEffect(() => {
    if (isFn(effects)) {
      return effects(designer)
    }
  }, [])
  return designer
}
