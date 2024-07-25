import type { PropsWithChildren } from 'react'

export interface ICompositePanelItemProps extends PropsWithChildren {
  shape?: 'tab' | 'button' | 'link'
  title?: React.ReactNode
  icon?: React.ReactNode
  key?: number | string
  href?: string
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  extra?: React.ReactNode
}

export function CompositePanelItem(props: ICompositePanelItemProps) {
  return <></>
}
