import { useEffect, useRef } from 'react'
import { type Engine, GlobalRegistry } from 'designablecore'
import { DesignerEngineContext } from '../context'
import { useDesigner } from '../hooks'
import type { IDesignerProps } from '../types'
import { GhostWidget } from '../widgets'
import * as icons from '../icons'
import { Layout } from './Layout'

GlobalRegistry.registerDesignerIcons(icons)

export function Designer(props: IDesignerProps) {
  const { prefixCls = 'dn-', theme = 'light' } = props
  const engine = useDesigner()
  const ref = useRef<Engine>()
  useEffect(() => {
    if (props.engine) {
      if (props.engine && ref.current) {
        if (props.engine !== ref.current) {
          ref.current.unmount()
        }
      }
      props.engine.mount()
      ref.current = props.engine
    }
    return () => {
      if (props.engine) {
        props.engine.unmount()
      }
    }
  }, [props.engine])

  if (engine) {
    throw new Error(
      'There can only be one Designable Engine Context in the React Tree',
    )
  }
  return (
    <Layout {...props} prefixCls={prefixCls} theme={theme}>
      <DesignerEngineContext.Provider value={props.engine}>
        {props.children}
        <GhostWidget />
      </DesignerEngineContext.Provider>
    </Layout>
  )
}
