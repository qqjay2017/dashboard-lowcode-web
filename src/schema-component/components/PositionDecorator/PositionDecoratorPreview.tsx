import type { PropsWithChildren } from 'react'
import { useMemo } from 'react'
import { observer, useField } from '@formily/react'
import { useDashboardRoot } from '../DashboardRoot'

import type { PositionDecoratorOptions } from './types'
import { cn, sizeFormat } from '@/utils'

export const PositionDecoratorPreview = observer((props: PropsWithChildren<PositionDecoratorOptions>) => {
  const {
    children,
    x = 0,
    y = 0,
    w = 0,
    h = 0,
    zIndex = 2,
    style,
    padding = 12,
    className,

  } = props

  // const field = useField()

  // const eid = field?.address?.toString()
  // const elementId = eidToElementId(eid)
  const { colWidth, rowHeight } = useDashboardRoot()

  const width = sizeFormat(colWidth * w)
  const height = sizeFormat(rowHeight * h)
  const styleMemo = useMemo(() => {
    const s: React.CSSProperties = {
      // ...style,
    }
    if (zIndex) {
      s.zIndex = zIndex
    }
    if (padding) {
      s.padding = Array.isArray(padding)
        ? padding
          .map(p =>
            typeof p === 'number'
              ? p > 0
                ? `${p / 100}rem`
                : `${p || 0}px`
              : p,
          )
          .join(' ')
        : padding
    }

    return s
  }, [padding, zIndex])
  const designerProps = props.nodeId
    ? {
        'data-designer-node-id': props.nodeId,
      }
    : {}

  console.log(props.style, 'props style preview')
  return (
    <div
      // id={elementId}
      className={cn('positionDecoratorHandle', className)}
      style={{
        position: 'absolute',
        width,
        height,
        zIndex,
        padding: styleMemo.padding,
        left: sizeFormat(x * colWidth),
        top: sizeFormat(
          y * rowHeight,
        ),
        // transform: `translate( }px,  ${}px )`
        ...style,
      }}
      {...designerProps}
    >
      {children}
    </div>
  )
})
