import React, { useEffect, useRef } from 'react'
import cls from 'classnames'
import { usePrefix } from '../../hooks'

export interface IPCSimulatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  style?: React.CSSProperties
}
const viewWidth = 3840
const viewHeight = 2160
export const PCSimulator: React.FC<IPCSimulatorProps> = (props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const prefix = usePrefix('pc-simulator')
  const handleViewPortFit = () => {
    if (!scrollAreaRef.current) {
      return
    }
    const wspace = document
      .getElementById('workspace-panel')!
      .getBoundingClientRect()

    if (!wspace) {
      return false
    }

    const { width, height } = wspace

    scrollAreaRef.current.scrollLeft = (viewWidth - width) / 2

    scrollAreaRef.current.scrollTop = (viewHeight - height) / 2
  }

  useEffect(() => {
    handleViewPortFit()
  }, [])
  return (
    <div
      ref={scrollAreaRef}
      className={
        cls(`${prefix}-scroll`)
      }
    >
      <div {...props} className={cls(prefix, props.className)}>
        <div
          className={
            cls(`${prefix}-center`)
          }
        >
          <div
            className={
              cls(`${prefix}-pointerevents`)
            }
          >
            {props.children}
          </div>

        </div>

      </div>
    </div>
  )
}
