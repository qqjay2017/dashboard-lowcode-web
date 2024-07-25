import type { PropsWithChildren } from 'react'
import React from 'react'
import { observer } from '@formily/reactive-react'

import { DroppableWidget } from '@/Designer/react/widgets/DroppableWidget'

export const Container: React.FC<PropsWithChildren> = observer((props) => {
  return <DroppableWidget>{props.children}</DroppableWidget>
})

export function withContainer(Target: React.JSXElementConstructor<any>) {
  return (props: any) => {
    return (
      <DroppableWidget>
        <Target {...props} />
      </DroppableWidget>
    )
  }
}
