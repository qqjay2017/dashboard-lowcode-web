import React, { PropsWithChildren, useContext } from 'react'

import cls from 'classnames'

import { IconWidget, usePrefix } from '@/Designer/react/lib'

export interface IInputItemsContext {
  width?: string | number
  vertical?: boolean
}

export interface IInputItemsProps extends PropsWithChildren{
  className?: string
  style?: React.CSSProperties
  width?: string | number
  vertical?: boolean
}

export interface IInputItemProps  extends PropsWithChildren{
  className?: string
  style?: React.CSSProperties
  icon?: React.ReactNode
  width?: string | number
  vertical?: boolean
  title?: React.ReactNode
}

const InputItemsContext = React.createContext<IInputItemsContext>(null)

export const InputItems: React.FC<IInputItemsProps> & {
  Item: React.FC<IInputItemProps>
} = ({width="100%",...props}) => {
  const prefix = usePrefix('input-items')
  return (
    <InputItemsContext.Provider value={{
      ...props,
      width
    }} >
      <div className={cls(prefix, props.className)} style={props.style}>
        {props.children}
      </div>
    </InputItemsContext.Provider>
  )
}



InputItems.Item = (props) => {
  const prefix = usePrefix('input-items-item')
  const ctx = useContext(InputItemsContext)
  return (
    <div
      className={cls(prefix, props.className, {
        vertical: props.vertical || ctx.vertical,
      })}
      style={{ width: props.width || ctx.width, ...props.style }}
    >
      {props.icon && (
        <div className={prefix + '-icon'}>
          <IconWidget infer={props.icon} size={16} />
        </div>
      )}
      {props.title && <div className={prefix + '-title'}>{props.title}</div>}
      <div className={prefix + '-controller'}>{props.children}</div>
    </div>
  )
}
