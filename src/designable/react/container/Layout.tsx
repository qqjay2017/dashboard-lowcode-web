import React, { Fragment, useContext, useRef } from 'react'

import { DesignerLayoutContext } from '../context'
import type { IDesignerLayoutProps } from '../types'

export const Layout: React.FC<IDesignerLayoutProps> = (props) => {
  const layout = useContext(DesignerLayoutContext)
  const ref = useRef<HTMLDivElement>()

  if (layout) {
    return <Fragment>{props.children}</Fragment>
  }
  return (
    <div
      ref={ref}

    >
      <DesignerLayoutContext.Provider
        value={{
          theme: props.theme,
          prefixCls: props.prefixCls,
          position: props.position,
        }}
      >
        {props.children}
      </DesignerLayoutContext.Provider>
    </div>
  )
}
