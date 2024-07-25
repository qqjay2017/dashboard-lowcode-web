import React, { Fragment, useContext, useLayoutEffect, useRef } from 'react'
import { each } from 'designableshared'
import cls from 'classnames'
import { DesignerLayoutContext } from '../context'
import type { IDesignerLayoutProps } from '../types'

export const Layout: React.FC<IDesignerLayoutProps> = (props) => {
  const { theme = 'light', prefixCls = 'dn-', position = 'fixed' } = props
  const layout = useContext(DesignerLayoutContext)
  const ref = useRef<HTMLDivElement>()

  useLayoutEffect(() => {
    if (ref.current) {
      each(props.variables, (value, key) => {
        ref.current.style.setProperty(`--${key}`, value)
      })
    }
  }, [])

  if (layout) {
    return <>{props.children}</>
  }
  return (
    <div
      ref={ref}
      className={cls({
        [`${prefixCls}app`]: true,
        [`${prefixCls}${theme}`]: theme,
      })}
    >
      <DesignerLayoutContext.Provider
        value={{
          theme,
          prefixCls,
          position,
        }}
      >
        {props.children}
      </DesignerLayoutContext.Provider>
    </div>
  )
}
