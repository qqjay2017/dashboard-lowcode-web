import type { PropsWithChildren } from 'react'
import React from 'react'
import cls from 'classnames'
import { usePrefix } from '../../hooks'

export enum ResizeHandleType {
  Resize = 'RESIZE',
  ResizeWidth = 'RESIZE_WIDTH',
  ResizeHeight = 'RESIZE_HEIGHT',
}

export interface IResizeHandleProps extends PropsWithChildren {
  type?: ResizeHandleType
}

export const ResizeHandle: React.FC<IResizeHandleProps> = (props) => {
  const prefix = usePrefix('resize-handle')
  return (
    <div
      {...props}
      data-designer-resize-handle={props.type}
      className={cls(prefix, {
        [`${prefix}-${props.type}`]: !!props.type,
      })}
    >
      {props.children}
    </div>
  )
}
